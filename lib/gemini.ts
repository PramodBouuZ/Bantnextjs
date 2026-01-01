
import { GoogleGenAI, Type } from "@google/genai";

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
            budget: { type: Type.STRING },
            authority: { type: Type.STRING },
            need: { type: Type.STRING },
            timing: { type: Type.STRING },
            score: { type: Type.NUMBER }
          },
          required: ["budget", "authority", "need", "timing", "score"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      budget: 'Unknown',
      authority: 'Unknown',
      need: 'Analysis failed',
      timing: 'Long Term',
      score: 0
    };
  }
};
