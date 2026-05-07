// src/ai/flows/answer-question-llm.ts
'use server';

/**
 * @fileOverview An AI agent that answers health-related questions using a combination of a
 * structured database and an LLM for comprehensive responses.
 *
 * - answerQuestionUsingLLM - A function that answers a health-related question.
 * - AnswerQuestionUsingLLMInput - The input type for the answerQuestionUsingLLM function.
 * - AnswerQuestionUsingLLMOutput - The return type for the answerQuestionUsingLLM function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionUsingLLMInputSchema = z.object({
  question: z.string().describe('The health-related question to answer.'),
  language: z.enum(['en', 'hi', 'mr']).describe("The user's preferred language."),
  healthInfo: z.string().optional().describe('Relevant health information from the database, if available.'),
});
export type AnswerQuestionUsingLLMInput = z.infer<typeof AnswerQuestionUsingLLMInputSchema>;

const AnswerQuestionUsingLLMOutputSchema = z.object({
  answer: z.string().describe('The comprehensive answer to the question.'),
});
export type AnswerQuestionUsingLLMOutput = z.infer<typeof AnswerQuestionUsingLLMOutputSchema>;

export async function answerQuestionUsingLLM(input: AnswerQuestionUsingLLMInput): Promise<AnswerQuestionUsingLLMOutput> {
  return answerQuestionUsingLLMFlow(input);
}

const answerQuestionPrompt = ai.definePrompt({
  name: 'answerQuestionPrompt',
  input: {schema: AnswerQuestionUsingLLMInputSchema},
  output: {schema: AnswerQuestionUsingLLMOutputSchema},
  prompt: `You are a helpful AI assistant providing information on health-related topics.

  Answer the following question:
  {{question}}

  Respond in the user's preferred language: {{language}}.

  Use the following health information, if provided, to augment your answer:
  {{#if healthInfo}}
  {{healthInfo}}
  {{else}}
  No health information from database available.
  {{/if}}`,
});

const answerQuestionUsingLLMFlow = ai.defineFlow(
  {
    name: 'answerQuestionUsingLLMFlow',
    inputSchema: AnswerQuestionUsingLLMInputSchema,
    outputSchema: AnswerQuestionUsingLLMOutputSchema,
  },
  async input => {
    const {output} = await answerQuestionPrompt(input);
    return output!;
  }
);
