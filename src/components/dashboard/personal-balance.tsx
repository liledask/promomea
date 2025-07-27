
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DollarSign, TrendingUp, PiggyBank, CalendarPlus } from 'lucide-react';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface PersonalBalanceProps {
  user: User;
}

export default function PersonalBalance({ user }: PersonalBalanceProps) {
  return (
    <Card className="bg-secondary/30">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Personal Balance</CardTitle>
            <CardDescription>Your earnings overview and upcoming payout.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-background">
            <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Available for Payout</p>
                <p className="text-5xl font-bold text-primary">${user.upcomingPayout.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Next payout scheduled for Jul 15, 2025</p>
            </div>
            <Button size="lg" className="w-full sm:w-auto">Withdraw Funds</Button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
            <TrendingUp className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Pending Earnings</p>
              <p className="text-xl font-bold">${user.currentEarnings.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
            <PiggyBank className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
              <p className="text-xl font-bold">${user.lifetimeEarnings.toFixed(2)}</p>
            </div>
          </div>
           <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
            <CalendarPlus className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Total Events</p>
              <p className="text-xl font-bold">{user.eventsAdded}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
