import { openai } from "../config/openai.js";
import { safeJsonParse } from "../utils/jsonParser.js";

export const evaluateOutputs = async (outputA, outputB) => {
  const evaluationPrompt = `
Compare Output A (Original) and Output B (Optimized) **objectively**.

**Instructions:**
1. Score EACH metric independently (0-10 scale):
   - Clarity: How clear and understandable is the explanation?
   - Depth: How comprehensive and detailed is the content?
   - Structure: How well organized and formatted?
   - Technical Accuracy: How factually correct?

2. Calculate TOTAL: Sum of 4 scores for A vs B.

3. Determine WINNER **strictly by totals**:
   - If totalA > totalB: winner = "A"
   - If totalB > totalA: winner = "B" 
   - **If totals EQUAL: winner = "Tie"** (do not favor B)

4. Be unbiased - evaluate based on quality only, no preference for "optimized".

**Return ONLY valid JSON** (no markdown, no extra text):
{
  "clarityA": number,
  "clarityB": number,
  "depthA": number,
  "depthB": number,
  "structureA": number,
  "structureB": number,
  "accuracyA": number,
  "accuracyB": number,
  "winner": "A" or "B" or "Tie",
  "reason": "Brief reason (1-2 sentences)"
}

Output A (Original):
${outputA}

Output B (Optimized):
${outputB}
`;

  const response = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [{ role: "user", content: evaluationPrompt }],
  });

  const raw = response.choices[0].message.content;
  return safeJsonParse(raw);
};

