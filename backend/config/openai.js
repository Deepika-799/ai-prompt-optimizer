import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Use Groq as the AI provider
export const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
