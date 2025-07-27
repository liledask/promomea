
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';
import StatsCards from '@/components/dashboard/stats-cards';
import TierProgress from '@/components/dashboard/tier-progress';
import ActivityFeed from '@/components/dashboard/activity-feed';
import ImpactTracker from '@/components/dashboard/impact-tracker';
import GoalRecommendation from '@/components/dashboard/goal-recommendation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TIER_DETAILS } from '@/lib/constants';
import { getCurrentUser } from '@/lib/data';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  
  const currentTierDetails = TIER_DETAILS[user.currentTier];

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile picture"/>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">Here&apos;s your affiliate performance overview.</p>
            </div>
            </div>
            <Badge variant="outline" className="text-lg py-2 px-4 border-accent text-accent font-bold self-start sm:self-center">
            {currentTierDetails.name} Tier
            </Badge>
        </div>

        <StatsCards user={user} />

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
            <TierProgress user={user} />
            <GoalRecommendation user={user} />
            </div>
            <div className="space-y-8">
            <ActivityFeed />
            <ImpactTracker />
            </div>
        </div>
    </div>
  );
}
