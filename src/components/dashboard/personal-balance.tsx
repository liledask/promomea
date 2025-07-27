
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, PiggyBank, CalendarPlus } from 'lucide-react';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PayoutSettingsDialog from './payout-settings-dialog';


interface PersonalBalanceProps {
  user: User;
}

export default function PersonalBalance({ user }: PersonalBalanceProps) {
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState(false);

  if (!user) {
    return (
        <Card className="bg-secondary/30">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Personal Balance</CardTitle>
                <CardDescription>Your earnings overview and upcoming payout.</CardDescription>
            </CardHeader>
            <CardContent>
                <div>Loading...</div>
            </CardContent>
        </Card>
    )
  }
  return (
    <>
        <Card className="bg-secondary/30">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Personal Balance</CardTitle>
                <CardDescription>Your earnings overview and upcoming payout.</CardDescription>
            </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-background">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Available for Payout</p>
                    <p className="text-5xl font-bold text-primary">${(user.upcoming_payout || 0).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Next payout scheduled for Jul 15, 2025</p>
                </div>
                <Button size="lg" className="w-full sm:w-auto" onClick={() => setIsPayoutDialogOpen(true)}>Manage Payouts</Button>
            </div>
            
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                <TrendingUp className="w-8 h-8 text-accent" />
                <div>
                <p className="text-sm text-muted-foreground">Pending Earnings</p>
                <p className="text-xl font-bold">${(user.current_earnings || 0).toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                <PiggyBank className="w-8 h-8 text-accent" />
                <div>
                <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
                <p className="text-xl font-bold">${(user.lifetime_earnings || 0).toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                <CalendarPlus className="w-8 h-8 text-accent" />
                <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-xl font-bold">{user.events_added || 0}</p>
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
        <PayoutSettingsDialog 
            isOpen={isPayoutDialogOpen} 
            setIsOpen={setIsPayoutDialogOpen} 
            user={user}
        />
    </>
  );
}
