import { GoogleGenAI } from "@google/genai";
import { Currency } from "../types";

// Using a safer implementation that doesn't crash if env is missing, 
// but strictly follows the instruction to use process.env.API_KEY
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getPurchasingPowerInsight = async (amount: number, currency: Currency): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Configure API Key in environment to unlock AI insights.";
  }

  const prompt = `
    Context: A user is converting currency.
    Amount: ${amount.toLocaleString()} ${currency}.
    Task: Provide a ONE sentence, witty or interesting purchasing power comparison for this amount in a global or luxury context (Rolex theme). 
    Examples: "That's enough to buy a vintage Submariner," or "Roughly the GDP of a small island nation."
    Keep it under 20 words. No markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Insight unavailable at the moment.";
  }
};