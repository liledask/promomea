'use server';

import { getGoalRecommendation, GoalRecommendationInput, GoalRecommendationOutput } from '@/ai/flows/goal-recommendation';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';

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

const payoutSettingsSchema = z.object({
  payout_method: z.string().min(1, 'Payout method is required.'),
  payout_detail: z.string().min(1, 'Payout details are required.'),
  userId: z.string().uuid(),
});

export async function updatePayoutSettingsAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = payoutSettingsSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid data provided.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const { error } = await supabase
      .from('promo_profile')
      .update({
        payout_method: parsed.data.payout_method,
        payout_detail: parsed.data.payout_detail,
      })
      .eq('id', parsed.data.userId);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error updating payout settings:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred.',
    };
  }
}
