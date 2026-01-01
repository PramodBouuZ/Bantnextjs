
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly in the named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface BANTAnalysis {
  budget: 'High' | 'Medium' | 'Low' | 'Unknown';
  authority: 'Decision Maker' | 'Influencer' | 'Researcher' | 'Unknown';
  need: string;
  timing: 'Immediate' | 'Next 3 Months' | 'Next 6 Months' | 'Long Term';
  score: number;
}

export const analyzeLeadWithAI = async (description: string): Promise<BANTAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following B2B sales lead for BANT (Budget, Authority, Need, Timing).
      Lead Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            budget: { type: Type.STRING, description: "One of: High, Medium, Low, Unknown" },
            authority: { type: Type.STRING, description: "One of: Decision Maker, Influencer, Researcher, Unknown" },
            need: { type: Type.STRING, description: "Short summary of the business need" },
            timing: { type: Type.STRING, description: "One of: Immediate, Next 3 Months, Next 6 Months, Long Term" },
            score: { type: Type.NUMBER, description: "Overall lead quality score 0-100" }
          },
          required: ["budget", "authority", "need", "timing", "score"]
        }
      }
    });

    // Directly access the .text property of GenerateContentResponse.
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      budget: 'Unknown',
      authority: 'Unknown',
      need: 'Analysis failed',
      timing: 'Long Term',
      score: 0
    };
  }
};
