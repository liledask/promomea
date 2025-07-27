// Goal Recommendation Flow
'use server';

/**
 * @fileOverview Provides personalized recommendations for affiliate tier and earning goals.
 *
 * This file exports:
 * - `getGoalRecommendation` - A function that returns personalized goal recommendations.
 * - `GoalRecommendationInput` - The input type for the `getGoalRecommendation` function.
 * - `GoalRecommendationOutput` - The return type for the `getGoalRecommendation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GoalRecommendationInputSchema = z.object({
  currentTier: z.enum(['PT', 'PC', 'DPCA', 'TPCA', 'PPCA']).describe('The current affiliate tier of the user.'),
  currentEarnings: z.number().describe('The current earnings of the user.'),
  eventsAdded: z.number().describe('The number of events the user has added.'),
});
export type GoalRecommendationInput = z.infer<typeof GoalRecommendationInputSchema>;

const GoalRecommendationOutputSchema = z.object({
  recommendedTier: z.enum(['PT', 'PC', 'DPCA', 'TPCA', 'PPCA']).describe('The recommended affiliate tier for the user to aim for.'),
  recommendedEarnings: z.number().describe('The recommended earnings for the user to aim for.'),
  recommendedEventsToAdd: z.number().describe('The recommended number of events for the user to add.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type GoalRecommendationOutput = z.infer<typeof GoalRecommendationOutputSchema>;

export async function getGoalRecommendation(input: GoalRecommendationInput): Promise<GoalRecommendationOutput> {
  return goalRecommendationFlow(input);
}

const goalRecommendationPrompt = ai.definePrompt({
  name: 'goalRecommendationPrompt',
  input: {schema: GoalRecommendationInputSchema},
  output: {schema: GoalRecommendationOutputSchema},
  prompt: `You are an AI assistant that provides personalized recommendations for affiliate tier and earning goals.

  Based on the user's current tier ({{{currentTier}}}), current earnings ({{{currentEarnings}}}), and number of events added ({{{eventsAdded}}}), recommend:
  - A specific affiliate tier for the user to aim for (recommendedTier).
  - A specific earnings goal for the user to aim for (recommendedEarnings).
  - A specific number of events for the user to add (recommendedEventsToAdd).

  Also, explain your reasoning in the reasoning field.

  Ensure that the recommended tier is higher than the current tier.
  Provide ambitious but attainable goals.
  Consider that:
    - PT (ProMo Trainee) requires 5 total events to advance.
    - PC (ProMo Certified) requires 15 total events to advance.
    - DPCA (Double ProMo Certified) requires 40 total events to advance.
    - TPCA (Triple ProMo Certified) requires 90 total events to advance.
    - PPCA (Presidential ProMo Certified) is the highest tier.`,
});

const goalRecommendationFlow = ai.defineFlow(
  {
    name: 'goalRecommendationFlow',
    inputSchema: GoalRecommendationInputSchema,
    outputSchema: GoalRecommendationOutputSchema,
  },
  async input => {
    const {output} = await goalRecommendationPrompt(input);
    return output!;
  }
);
