import express from "express";
import { optimizePrompt } from "../services/optimizerService.js";
import { executePrompt } from "../services/executionService.js";
import { evaluateOutputs } from "../services/evaluationService.js";

const router = express.Router();

router.post("/optimize", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Step 1: Optimize prompt
    const optimizedPrompt = await optimizePrompt(prompt);

    // Step 2: Execute both prompts
    const outputA = await executePrompt(prompt);
    const outputB = await executePrompt(optimizedPrompt);

    // Step 3: Evaluate outputs
    const evaluation = await evaluateOutputs(outputA, outputB);

    res.json({
      originalPrompt: prompt,
      optimizedPrompt,
      outputA,
      outputB,
      evaluation,
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    
    // Provide more specific error messages
    let errorMessage = "Internal Server Error";
    let errorDetails = error.message;

    // Check for OpenAI API errors
    if (error.code === "invalid_api_key") {
      errorMessage = "Invalid API Key";
      errorDetails = "The OpenAI API key is invalid. Please check your .env file.";
    } else if (error.code === "insufficient_quota") {
      errorMessage = "API Quota Exceeded";
      errorDetails = "You have exceeded your OpenAI API quota. Please check your account.";
    } else if (error.message?.includes("OPENAI_API_KEY")) {
      errorMessage = "API Key Configuration Error";
      errorDetails = error.message;
    } else if (error.message?.includes("rate_limit")) {
      errorMessage = "Rate Limit Exceeded";
      errorDetails = "Too many requests. Please wait and try again.";
    }

    res.status(500).json({ 
      error: errorMessage,
      details: errorDetails 
    });
  }
});

export default router;
