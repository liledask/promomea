
'use client'

import TierProgress from "@/components/dashboard/tier-progress";
import { TIER_DETAILS } from "@/lib/constants";
import type { User } from "@/lib/types";
import { Award, CheckCircle, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Dummy data for an experienced user
const experiencedUser: User = {
    name: 'Jessica Wang',
    avatarUrl: 'https://placehold.co/100x100',
    currentTier: 'DPCA',
    currentEarnings: 1850.75,
    lifetimeEarnings: 7540.25,
    eventsAdded: 42,
    upcomingPayout: 1250.00,
};

const tierHistory = [
    { tier: 'PT', date: '2024-01-15' },
    { tier: 'PC', date: '2024-03-01' },
    { tier: 'DPCA', date: '2024-08-20' },
]

export default function TierProgressPage() {
    const user = experiencedUser;
    const tierLevels = Object.keys(TIER_DETAILS) as (keyof typeof TIER_DETAILS)[];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Tier Progress</h1>
                <p className="text-muted-foreground">Your journey through the ProMo MEA affiliate ranks.</p>
            </div>

            <TierProgress user={user} />

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award /> Tier Benefits</CardTitle>
                        <CardDescription>A summary of the benefits for each tier.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tierLevels.map(level => {
                            const tier = TIER_DETAILS[level];
                            return (
                                <div key={level}>
                                    <h3 className="font-bold text-primary">{tier.name}</h3>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                                        {tier.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}
                                    </ul>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Star /> Your Achievements</CardTitle>
                        <CardDescription>Your timeline of tier promotions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="relative pl-6">
                         <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                         {tierHistory.map((item, index) => (
                            <div key={index} className="relative mb-8">
                               <div className="absolute -left-6 top-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center -translate-x-1/2">
                                  <CheckCircle size={14} className="text-primary-foreground" />
                               </div>
                               <p className="font-semibold">{TIER_DETAILS[item.tier as keyof typeof TIER_DETAILS].name} Tier Unlocked</p>
                               <p className="text-sm text-muted-foreground">Achieved on {new Date(item.date).toLocaleDateString()}</p>
                            </div>
                         ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
