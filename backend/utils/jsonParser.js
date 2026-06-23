export const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    try {
      // Try extracting JSON inside markdown block
      const match = text.match(/```json([\s\S]*?)```/);

      if (match && match[1]) {
        return JSON.parse(match[1].trim());
      }

      // Extract first {...} block
      const firstBrace = text.indexOf("{");
      const lastBrace = text.lastIndexOf("}");

      if (firstBrace !== -1 && lastBrace !== -1) {
        const jsonString = text.substring(firstBrace, lastBrace + 1);
        return JSON.parse(jsonString);
      }

      throw new Error("No valid JSON found.");
    } catch (finalError) {
      console.error("❌ JSON Parsing Failed:", finalError.message);

      // Return default values with camelCase field names
      return {
        clarityA: 5,
        clarityB: 5,
        depthA: 5,
        depthB: 5,
        structureA: 5,
        structureB: 5,
        accuracyA: 5,
        accuracyB: 5,
        winner: "A",
        reason: "Evaluation parsing failed. Default values used.",
      };
    }
  }
};
