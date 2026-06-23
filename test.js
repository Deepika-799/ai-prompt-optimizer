import { optimizePrompt } from "./backend/services/optimizerService.js";

const result = await optimizePrompt("Write a haiku about coding");
console.log("Optimized:", result);

