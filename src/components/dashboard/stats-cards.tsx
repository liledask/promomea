import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, BarChart, TrendingUp, CalendarPlus } from 'lucide-react';
import type { User } from '@/lib/types';
import { TIER_DETAILS } from '@/lib/constants';

interface StatsCardsProps {
  user: User;
}

export default function StatsCards({ user }: StatsCardsProps) {
  const currentTierInfo = TIER_DETAILS[user.currentTier];

  const stats = [
    {
      title: 'Total Earnings (Lifetime)',
      value: `$${user.lifetimeEarnings.toFixed(2)}`,
      description: 'All-time commission earned',
      icon: DollarSign,
    },
    {
      title: 'Current Tier Earnings',
      value: `$${user.currentEarnings.toFixed(2)}`,
      description: `${currentTierInfo.name} tier commissions`,
      icon: BarChart,
    },
    {
      title: 'Upcoming Payouts',
      value: `$${user.upcomingPayout.toFixed(2)}`,
      description: 'Next payment amount',
      icon: TrendingUp,
    },
    {
      title: 'Total Events Added',
      value: user.eventsAdded.toString(),
      description: 'Successful event referrals',
      icon: CalendarPlus,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
