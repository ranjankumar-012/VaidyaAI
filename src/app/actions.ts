"use server";

import { answerQuestionUsingLLM } from "@/ai/flows/answer-question-llm";
import type { Language } from "@/components/LanguageProvider";

export async function getAIResponse(question: string, language: Language) {
  try {
    const response = await answerQuestionUsingLLM({ question, language });
    return response.answer;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "I'm sorry, but I encountered an error while processing your request. Please try again later.";
  }
}
