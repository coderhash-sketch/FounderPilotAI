
"use server";
import { GoogleGenAI, Type } from "@google/genai";
import { StartupPlan, SurveyData, ReadinessQuestion, ReadinessResult } from "../types";
const apiKeyyy = import.meta.env.VITE_GEMINI_API_KEY as string;

const ai = new GoogleGenAI({ apiKey: apiKeyyy });

const STARTUP_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    elevatorPitch: { type: Type.STRING },
    problem: { type: Type.STRING },
    targetAudience: { type: Type.STRING },
    persona: {
      type: Type.OBJECT,
      properties: {
        role: { type: Type.STRING },
        behavior: { type: Type.STRING },
        location: { type: Type.STRING },
        primaryPainPoint: { type: Type.STRING }
      },
      required: ["role", "behavior", "location", "primaryPainPoint"]
    },
    mvpFeatures: {
      type: Type.OBJECT,
      properties: {
        mustHave: { type: Type.ARRAY, items: { type: Type.STRING } },
        niceToHave: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["mustHave", "niceToHave"]
    },
    pitchOutline: { type: Type.ARRAY, items: { type: Type.STRING } },
    roadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          task: { type: Type.STRING },
          goal: { type: Type.STRING }
        },
        required: ["day", "task", "goal"]
      }
    },
    validationChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
    acquisitionStrategy: { type: Type.STRING },
    toolStack: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["name", "category", "reason"]
      }
    },
    readinessScore: { type: Type.INTEGER }
  },
  required: [
    "name", "elevatorPitch", "problem", "targetAudience", "persona",
    "mvpFeatures", "pitchOutline", "roadmap", "validationChecklist", 
    "acquisitionStrategy", "toolStack", "readinessScore"
  ]
};

export async function generateStartupPlan(idea: string): Promise<StartupPlan> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this startup idea for an Indian university student: "${idea}". 
    Create a detailed execution plan focused on speed and campus-level MVP.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: STARTUP_PLAN_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as StartupPlan;
}

export async function generateReadinessQuestions(idea: string): Promise<ReadinessQuestion[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on the startup idea: "${idea}", generate 5 unique, tough questions to test a university founder's readiness. 
    Focus on: 
    1. Operational reality (e.g. campus permissions)
    2. Technical feasibility for a student budget
    3. User acquisition in hostel/college environments
    4. Balancing with academics.
    Return 5 questions with 4 logical options each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            context: { type: Type.STRING, description: "Why this question matters for this specific idea" },
            options: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["id", "question", "context", "options"]
        }
      }
    }
  });
  return JSON.parse(response.text) as ReadinessQuestion[];
}

export async function evaluateReadiness(idea: string, answers: string[]): Promise<ReadinessResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Startup Idea: "${idea}"
    Founder Answers to Stress Test: ${answers.join(" | ")}
    
    Evaluate the founder's readiness. Be blunt and realistic for the Indian ecosystem.
    Provide a score (0-100), a grade (A+ to F), a list of 3 hidden blindspots, and a final verdict.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          grade: { type: Type.STRING },
          blindspots: { type: Type.ARRAY, items: { type: Type.STRING } },
          verdict: { type: Type.STRING }
        },
        required: ["score", "grade", "blindspots", "verdict"]
      }
    }
  });
  return JSON.parse(response.text) as ReadinessResult;
}
