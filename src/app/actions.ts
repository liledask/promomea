'use server';

import { getGoalRecommendation, GoalRecommendationInput, GoalRecommendationOutput } from '@/ai/flows/goal-recommendation';

export async function getGoalRecommendationAction(input: GoalRecommendationInput): Promise<{
  success: boolean;
  data?: GoalRecommendationOutput;
  error?: string;
}> {
  try {
    const result = await getGoalRecommendation(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting goal recommendation:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
