import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import "./TravelAssistant.css";

const starterMessage = {
  role: "assistant",
  content:
    "Tell me what kind of Ethiopian trip you have in mind. I can suggest places and TourET hotels that fit your budget.",
};

const quickPrompts = [
  "A 3-day cultural trip under $500",
  "Best places for a relaxing weekend",
  "A hotel near Lalibela for two people",
];

const budgetOptions = ["Under $300", "Under $500", "Under $1,000"];

const getBackendUrl = () =>
  (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api").replace(/\/$/, "");

const TravelAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([starterMessage]);
  const [input, setInput] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeModel, setActiveModel] = useState("");

  const conversationHistory = useMemo(
    () => messages.filter((message) => message !== starterMessage),
    [messages]
  );

  const sendMessage = async (messageOverride) => {
    const message = (messageOverride || input).trim();
    if (!message || isLoading) return;

    const userMessage = { role: "user", content: message };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${getBackendUrl()}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          budget,
          history: conversationHistory,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "The assistant could not answer right now.");

      setMessages((current) => [...current, { role: "assistant", content: payload.reply }]);
      setActiveModel(payload.model || "");
    } catch (requestError) {
      setError(requestError.message || "Could not connect to the travel assistant.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([starterMessage]);
    setInput("");
    setError("");
    setActiveModel("");
  };

  return (
    <div className="travel-assistant" aria-live="polite">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="travel-assistant-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label="TourET travel assistant"
          >
            <div className="travel-assistant-header">
              <div className="travel-assistant-heading">
                <div className="travel-assistant-avatar"><Sparkles size={18} /></div>
                <div>
                  <div className="travel-assistant-title">Trip matchmaker</div>
                  <div className="travel-assistant-subtitle">Powered by the latest available Gemini model</div>
                </div>
              </div>
              <div className="travel-assistant-actions">
                <button type="button" className="travel-assistant-icon-button" onClick={resetChat} aria-label="Reset conversation" title="Reset conversation">
                  <RotateCcw size={16} />
                </button>
                <button type="button" className="travel-assistant-icon-button" onClick={() => setIsOpen(false)} aria-label="Close travel assistant">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="travel-assistant-body">
              <div className="travel-assistant-welcome">
                <span className="travel-assistant-eyebrow">Plan with your budget</span>
                <p>Ask naturally about places, hotels, duration, or travel style. I’ll use TourET’s catalog when making suggestions.</p>
              </div>

              <div className="travel-assistant-budget" aria-label="Optional budget shortcuts">
                <span className="travel-assistant-label">Quick budget</span>
                <div className="travel-assistant-chips">
                  {budgetOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`travel-assistant-chip ${budget === option ? "is-selected" : ""}`}
                      onClick={() => setBudget((current) => current === option ? "" : option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="travel-assistant-messages" role="log" aria-label="Conversation">
                {messages.map((message, index) => (
                  <div className={`travel-assistant-message ${message.role}`} key={`${message.role}-${index}`}>
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="travel-assistant-message assistant travel-assistant-loading">
                    <span /><span /><span />
                  </div>
                )}
              </div>

              {error && <div className="travel-assistant-error" role="alert">{error}</div>}

              {messages.length === 1 && !isLoading && (
                <div className="travel-assistant-quick-prompts">
                  {quickPrompts.map((prompt) => (
                    <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>
                  ))}
                </div>
              )}

              <form
                className="travel-assistant-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="e.g. I have $700 for five days..."
                  rows={2}
                  disabled={isLoading}
                  aria-label="Ask the travel assistant"
                />
                <button type="submit" className="travel-assistant-send" disabled={!input.trim() || isLoading} aria-label="Send message">
                  <Send size={17} />
                </button>
              </form>
              <div className="travel-assistant-footnote">
                {activeModel ? `Using ${activeModel}` : "Suggestions are informational; confirm current availability before booking."}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`travel-assistant-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close trip matchmaker" : "Open trip matchmaker"}
      >
        {isOpen ? <X size={21} /> : <MessageCircle size={21} />}
        <span>{isOpen ? "Close" : "Ask TourET"}</span>
      </motion.button>
    </div>
  );
};

export default TravelAssistant;
