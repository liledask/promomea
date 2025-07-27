
'use client';

import { useAuth } from '@/hooks/use-auth';
import TierProgress from '@/components/dashboard/tier-progress';
import ActivityFeed from '@/components/dashboard/activity-feed';
import ImpactTracker from '@/components/dashboard/impact-tracker';
import GoalRecommendation from '@/components/dashboard/goal-recommendation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TIER_DETAILS } from '@/lib/constants';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="space-y-6">
        <div>Loading...</div>
      </div>
    );
  }
  
  const currentTierDetails = TIER_DETAILS[user.current_tier];

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar_url} alt={user.full_name} data-ai-hint="profile picture"/>
                <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-2xl font-headline font-bold text-foreground">Welcome back, {user.full_name}!</h1>
                <p className="text-sm text-muted-foreground">Here&apos;s your affiliate performance overview.</p>
            </div>
            </div>
            <Badge variant="outline" className="text-base py-1.5 px-3 border-accent text-accent font-bold self-start sm:self-center">
            {currentTierDetails.name} Tier
            </Badge>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-6">
              <TierProgress user={user} />
              <GoalRecommendation user={user} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <ActivityFeed />
              <ImpactTracker />
            </div>
        </div>
    </div>
  );
}
