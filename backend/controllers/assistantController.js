import Package from "../Models/packageModel.js";
import Hotel from "../Models/hotelModel.js";

const GEMINI_API_ROOT = "https://generativelanguage.googleapis.com/v1beta";
const MODEL_CACHE_TTL_MS = 10 * 60 * 1000;
let modelCache = { modelId: null, expiresAt: 0 };

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;

const isChatModel = (model) => {
  const modelId = String(model.baseModelId || model.name || "")
    .replace(/^models\//, "")
    .toLowerCase();
  const methods = [
    ...(model.supportedGenerationMethods || []),
    ...(model.supportedActions || []),
  ].map((method) => String(method).toLowerCase());

  if (!modelId || !modelId.includes("gemini") || !methods.includes("generatecontent")) {
    return false;
  }

  return ![
    "image",
    "live",
    "tts",
    "embedding",
    "robotics",
    "computer-use",
    "deep-research",
    "omni",
  ].some((term) => modelId.includes(term));
};

const modelVersion = (model) => {
  const modelId = String(model.baseModelId || model.name || "");
  const numbers = modelId.match(/\d+(?:\.\d+)?/g) || ["0"];
  return numbers.reduce((score, value, index) => {
    return score + Number.parseFloat(value) / 10 ** (index * 3);
  }, 0);
};

const modelStability = (model) => {
  const modelId = String(model.baseModelId || model.name || "").toLowerCase();
  if (modelId.includes("experimental")) return 0;
  if (modelId.includes("preview")) return 1;
  return 2;
};

const modelCapability = (model) => {
  const modelId = String(model.baseModelId || model.name || "").toLowerCase();
  if (modelId.includes("pro")) return 3;
  if (modelId.includes("flash") && !modelId.includes("lite")) return 2;
  return 1;
};

const chooseNewestModel = (models) => {
  const candidates = models.filter(isChatModel);
  if (!candidates.length) {
    throw new Error("No Gemini model with generateContent support is available for this API key.");
  }

  candidates.sort((a, b) => {
    return (
      modelVersion(b) - modelVersion(a) ||
      modelStability(b) - modelStability(a) ||
      modelCapability(b) - modelCapability(a)
    );
  });

  return String(candidates[0].baseModelId || candidates[0].name).replace(/^models\//, "");
};

const fetchAvailableModels = async (apiKey) => {
  const models = [];
  let pageToken = "";

  for (let page = 0; page < 3; page += 1) {
    const url = new URL(`${GEMINI_API_ROOT}/models`);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("pageSize", "1000");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await fetch(url);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.error?.message || "Gemini model discovery failed.");
    }

    models.push(...(payload.models || []));
    pageToken = payload.nextPageToken || "";
    if (!pageToken) break;
  }

  return models;
};

const getNewestModel = async (apiKey) => {
  if (modelCache.modelId && modelCache.expiresAt > Date.now()) {
    return modelCache.modelId;
  }

  const models = await fetchAvailableModels(apiKey);
  const modelId = chooseNewestModel(models);
  modelCache = { modelId, expiresAt: Date.now() + MODEL_CACHE_TTL_MS };
  return modelId;
};

const compactText = (value, maxLength = 260) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const getCatalogContext = async () => {
  try {
    const [packages, hotels] = await Promise.all([
      Package.find({})
        .select("name location duration pricePerAdult rating type to_do_type")
        .limit(60)
        .lean(),
      Hotel.find({})
        .select("name location description")
        .limit(60)
        .lean(),
    ]);

    return {
      packages: packages.map((item) => ({
        name: compactText(item.name, 100),
        location: compactText(item.location, 100),
        duration: compactText(item.duration, 60),
        pricePerAdult: item.pricePerAdult,
        rating: item.rating,
        type: compactText(item.type, 60),
        activity: compactText(item.to_do_type, 100),
      })),
      hotels: hotels.map((item) => ({
        name: compactText(item.name, 100),
        location: compactText(item.location, 100),
        description: compactText(item.description, 220),
      })),
    };
  } catch (error) {
    console.warn("Assistant catalog context unavailable:", error.message);
    return { packages: [], hotels: [] };
  }
};

const historyForPrompt = (history) =>
  (Array.isArray(history) ? history : [])
    .filter((item) => item && ["user", "assistant"].includes(item.role))
    .slice(-8)
    .map((item) => `${item.role === "user" ? "Traveler" : "Advisor"}: ${compactText(item.content, 1200)}`)
    .join("\n");

export const chatWithAssistant = async (req, res) => {
  const apiKey = getApiKey();
  const message = compactText(req.body?.message, 2000);
  const budget = compactText(req.body?.budget, 120);

  if (!apiKey) {
    return res.status(503).json({
      message: "Gemini is not configured yet. Add GEMINI_API_KEY to backend/.env and restart the server.",
    });
  }

  if (!message) {
    return res.status(400).json({ message: "Tell me where you want to go and what kind of budget you have." });
  }

  try {
    const [modelId, catalog] = await Promise.all([
      getNewestModel(apiKey),
      getCatalogContext(),
    ]);

    const prompt = `You are TourET's warm, practical travel-planning assistant for Ethiopia.
Help the traveler discover bookable TourET places and hotels using natural language.

Rules:
- Use the TourET catalog below as the source of truth for names, locations, package prices, durations, and ratings.
- Never invent package prices, hotel prices, availability, booking confirmations, or policies.
- If the catalog does not contain a requested hotel or a price, say that clearly and offer the closest catalog-backed alternative.
- Treat any budget as a hard constraint when enough information is provided. Ask one concise follow-up question if the currency, duration, or traveler count is essential.
- Recommend up to three options and explain the budget fit in plain language.
- Keep replies under 180 words, friendly, specific, and action-oriented. Mention that the traveler can open Packages to continue booking when relevant.

Traveler budget field: ${budget || "Not separately provided; infer it only when stated in the message."}
Traveler message: ${message}

Recent conversation:
${historyForPrompt(req.body?.history) || "No previous messages."}

TourET package catalog:
${JSON.stringify(catalog.packages)}

TourET hotel catalog:
${JSON.stringify(catalog.hotels)}`;

    const response = await fetch(
      `${GEMINI_API_ROOT}/models/${encodeURIComponent(modelId)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 700,
          },
        }),
      }
    );

    const payload = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        modelCache = { modelId: null, expiresAt: 0 };
      }
      return res.status(response.status >= 500 ? 502 : response.status).json({
        message: payload?.error?.message || "Gemini could not answer right now.",
      });
    }

    const reply = (payload.candidates?.[0]?.content?.parts || [])
      .map((part) => part.text || "")
      .join("\n")
      .trim();

    if (!reply) {
      return res.status(502).json({ message: "Gemini returned an empty response. Please try again." });
    }

    return res.json({ reply, model: modelId });
  } catch (error) {
    console.error("Gemini assistant error:", error.message);
    return res.status(502).json({ message: error.message || "The travel assistant is temporarily unavailable." });
  }
};
