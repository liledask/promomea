
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Target, Zap, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { getGoalRecommendationAction } from '@/app/actions';
import type { GoalRecommendationOutput } from '@/ai/flows/goal-recommendation';
import type { User } from '@/lib/types';
import { TIER_DETAILS } from '@/lib/constants';

interface GoalRecommendationProps {
  user: User;
}

export default function GoalRecommendation({ user }: GoalRecommendationProps) {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<GoalRecommendationOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGetRecommendation = async () => {
    setLoading(true);
    const result = await getGoalRecommendationAction({
      currentTier: user.current_tier,
      currentEarnings: user.current_earnings,
      eventsAdded: user.events_added,
    });

    setLoading(false);

    if (result.success && result.data) {
      setRecommendation(result.data);
      setIsDialogOpen(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to get recommendation.',
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Rocket className="text-accent" />
            <span>AI-Powered Goal Setting</span>
          </CardTitle>
          <CardDescription>
            Get personalized recommendations to supercharge your affiliate growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-secondary/50 rounded-lg">
            <p className="mb-4 text-muted-foreground">
              Let our AI analyze your performance and suggest your next big move.
            </p>
            <Button onClick={handleGetRecommendation} disabled={loading} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Get My Goal Recommendation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-center">Your Next Mission</DialogTitle>
            <DialogDescription className="text-center">
              Here are your AI-powered goals to level up your affiliate game.
            </DialogDescription>
          </DialogHeader>
          {recommendation && (
            <div className="space-y-6 py-4">
              <div className="text-center p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Aim for</p>
                <p className="text-3xl font-bold text-primary">{TIER_DETAILS[recommendation.recommendedTier].name} Tier</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                    <Target className="mx-auto mb-2 h-6 w-6 text-accent"/>
                    <p className="text-sm text-muted-foreground">Earnings Goal</p>
                    <p className="text-xl font-bold">${recommendation.recommendedEarnings.toLocaleString()}</p>
                </div>
                 <div className="p-4 rounded-lg bg-muted/50">
                    <Rocket className="mx-auto mb-2 h-6 w-6 text-accent"/>
                    <p className="text-sm text-muted-foreground">Events to Add</p>
                    <p className="text-xl font-bold">{recommendation.recommendedEventsToAdd}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">AI Reasoning:</h4>
                <p className="text-sm text-muted-foreground italic">
                  &quot;{recommendation.reasoning}&quot;
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
