import { openai } from "../config/openai.js";

export const executePrompt = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content.trim();
};
