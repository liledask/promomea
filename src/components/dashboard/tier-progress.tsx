
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Award } from 'lucide-react';
import type { User } from '@/lib/types';
import { TIER_DETAILS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { TierLevel } from '@/lib/types';

interface TierProgressProps {
  user: User;
}

export default function TierProgress({ user }: TierProgressProps) {
  const tierLevels = Object.keys(TIER_DETAILS) as (keyof typeof TIER_DETAILS)[];
  const currentUserTierIndex = user.current_tier ? tierLevels.indexOf(user.current_tier) : 0;
  
  const nextTier = currentUserTierIndex < tierLevels.length - 1 ? TIER_DETAILS[tierLevels[currentUserTierIndex + 1]] : null;
  const eventsAdded = user.events_added || 0;

  let progress = 0;
  let eventsForNextTier = 0;
  let currentTierGoalStart = 0;

  if (nextTier) {
    const nextTierKey = tierLevels[currentUserTierIndex + 1];
    const currentTierKey = user.current_tier || 'PT';

    if (currentTierKey !== 'PT') {
        currentTierGoalStart = TIER_DETAILS[tierLevels[currentUserTierIndex-1]].goalEvents;
    }
    
    eventsForNextTier = TIER_DETAILS[currentTierKey].goalEvents;
    const eventsNeededForNext = eventsForNextTier - currentTierGoalStart;
    const eventsMadeInTier = eventsAdded - currentTierGoalStart;

    progress = Math.min((eventsMadeInTier / eventsNeededForNext) * 100, 100);
  } else {
    progress = 100;
  }

  const nextTierGoalEvents = nextTier ? nextTier.goalEvents : eventsAdded;


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Tier Journey</CardTitle>
        <CardDescription>Complete goals to unlock new benefits and higher commissions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {nextTier ? (
          <div className="p-4 rounded-lg bg-secondary/50 border border-secondary">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-foreground">Next Tier: {nextTier.name}</p>
              <p className="text-sm font-medium text-accent">{eventsAdded} / {nextTier.goalEvents} events</p>
            </div>
            <Progress value={progress} className="h-3 bg-accent" />
            <p className="text-xs text-muted-foreground mt-2">
              You are {100 - Math.round(progress)}% away from unlocking the {nextTier.name} tier!
            </p>
          </div>
        ) : (
            <div className="p-4 rounded-lg bg-secondary/50 border border-secondary text-center">
                <p className="font-semibold text-foreground">You've reached the highest tier!</p>
                <p className="text-xs text-muted-foreground mt-1">Congratulations on becoming a Presidential ProMo Certified Affiliate!</p>
            </div>
        )}
        <div className="space-y-4">
          {tierLevels.map((level, index) => {
            const tier = TIER_DETAILS[level as TierLevel];
            const isUnlocked = currentUserTierIndex >= index;
            const isCurrent = currentUserTierIndex === index;

            return (
              <div
                key={level}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all',
                  isCurrent ? 'border-accent shadow-md' : 'border-border',
                  isUnlocked ? 'bg-card' : 'bg-muted/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', tier.color)}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-headline">{tier.name}</h3>
                        <p className="text-sm font-bold text-primary">{tier.commission}% Commission</p>
                    </div>
                  </div>
                  {isUnlocked ? (
                    <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={14} /> UNLOCKED
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">
                      {tier.goalEvents} Total Events
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <div className="mt-4 pl-11">
                    <p className="text-sm font-semibold mb-2">Your current benefits:</p>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={14} className="text-accent" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
