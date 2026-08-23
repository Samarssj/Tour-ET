import express from "express";
import { chatWithAssistant } from "../controllers/assistantController.js";

const assistantRouter = express.Router();

assistantRouter.post("/chat", chatWithAssistant);

export default assistantRouter;
