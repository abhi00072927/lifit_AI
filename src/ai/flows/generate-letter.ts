
// src/ai/flows/generate-letter.ts
'use server';

/**
 * @fileOverview AI agent that generates a letter based on the selected type and user-provided details.
 *
 * - generateLetter - A function to generate the letter.
 * - GenerateLetterInput - The input type for the generateLetter function.
 * - GenerateLetterOutput - The return type for the generateLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLetterInputSchema = z.object({
  letterType: z.enum(['College/School', 'Job', 'Application', 'Report']).describe('The type of letter to generate.'),
  userDetails: z.record(z.string(), z.string()).describe('A record of user details relevant to the letter type.'),
});

export type GenerateLetterInput = z.infer<typeof GenerateLetterInputSchema>;

const GenerateLetterOutputSchema = z.object({
  letter: z.string().describe('The generated letter.'),
});

export type GenerateLetterOutput = z.infer<typeof GenerateLetterOutputSchema>;

export async function generateLetter(input: GenerateLetterInput): Promise<GenerateLetterOutput> {
  return generateLetterFlow(input);
}

const generateLetterPrompt = ai.definePrompt({
  name: 'generateLetterPrompt',
  input: {schema: GenerateLetterInputSchema},
  output: {schema: GenerateLetterOutputSchema},
  prompt: `You are an AI assistant specialized in generating various types of letters.

  Based on the letter type and user details provided, generate a comprehensive and well-structured letter. The letter should start directly with the salutation (e.g., "Dear Mr. Smith,"). Do not include sender's address, date, or recipient's address blocks at the top; these will be handled separately.

  Letter Type: {{{letterType}}}
  User Details:
  {{#each userDetails}}
    {{@key}}: {{{this}}}
  {{/each}}

  Generated Letter:`,
});

const generateLetterFlow = ai.defineFlow(
  {
    name: 'generateLetterFlow',
    inputSchema: GenerateLetterInputSchema,
    outputSchema: GenerateLetterOutputSchema,
  },
  async input => {
    const {output} = await generateLetterPrompt(input);

    if (output && output.letter) {
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const senderInfoBlock = `[Your Address]
[Your Phone Number]
[Your Email Address]

${currentDate}\n\n`; // Added an extra newline for spacing after the date

      return {
        letter: senderInfoBlock + output.letter,
      };
    }
    return { letter: '' }; // Should not happen if prompt is well-defined
  }
);

