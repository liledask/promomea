
'use server';

import { getGoalRecommendation, GoalRecommendationInput, GoalRecommendationOutput } from '@/ai/flows/goal-recommendation';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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
      .from('promo_mea_table')
      .update({
        payout_method: parsed.data.payout_method,
        payout_detail: parsed.data.payout_detail,
      })
      .eq('id', parsed.data.userId);

    if (error) {
      throw error;
    }

    revalidatePath('/my-earnings');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating payout settings:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred.',
    };
  }
}

const userProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  userId: z.string().uuid(),
});

export async function updateUserProfileAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = userProfileSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid data provided.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const { error } = await supabase
      .from('promo_mea_table')
      .update({
        full_name: parsed.data.fullName,
      })
      .eq('id', parsed.data.userId)

    if (error) throw error;
    
    revalidatePath('/settings');
    revalidatePath('/dashboard');
    // Return only success, no data
    return { success: true };
  } catch (error: any)
  {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      error: error.message || 'Failed to update profile.',
    };
  }
}

const notificationSettingsSchema = z.object({
  email_notifications_enabled: z.boolean(),
  promotional_updates_enabled: z.boolean(),
  userId: z.string().uuid(),
});

export async function updateNotificationSettingsAction(formData: FormData) {
    const rawData = {
        email_notifications_enabled: formData.get('email_notifications_enabled') === 'true',
        promotional_updates_enabled: formData.get('promotional_updates_enabled') === 'true',
        userId: formData.get('userId'),
    };
    const parsed = notificationSettingsSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: false,
            error: 'Invalid data provided.',
        };
    }

    try {
        const { data: updatedProfile, error } = await supabase
            .from('promo_mea_table')
            .update({
                email_notifications_enabled: parsed.data.email_notifications_enabled,
                promotional_updates_enabled: parsed.data.promotional_updates_enabled,
            })
            .eq('id', parsed.data.userId)
            .select()
            .single();
        
        if (error) throw error;
        
        revalidatePath('/settings');
        return { success: true, data: updatedProfile };
    } catch (error: any) {
        console.error('Error updating notification settings:', error);
        return {
            success: false,
            error: error.message || 'Failed to update settings.',
        };
    }
}
