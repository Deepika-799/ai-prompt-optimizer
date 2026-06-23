import { openai } from "../config/openai.js";

export const optimizePrompt = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are a prompt optimization expert. Your task is to expand short prompts into clean, short prompts. Create an enhanced version in 15-25 words that follows this format: 'Explain [topic], including what it is, how it works, its main types, and give an example.' Keep it brief and direct. Return ONLY the optimized prompt.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from optimization model");
  }
  
  return content.trim();
};
