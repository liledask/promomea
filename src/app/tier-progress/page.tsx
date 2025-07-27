
'use client'

import { useState, useEffect } from 'react';
import TierProgress from "@/components/dashboard/tier-progress";
import { TIER_DETAILS } from "@/lib/constants";
import type { User, TierLevel } from "@/lib/types";
import { Award, CheckCircle, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getCurrentUser } from '@/lib/data';

const tierHistory = [
    { tier: 'PT', date: '2024-01-15' },
    { tier: 'PC', date: '2024-03-01' },
    { tier: 'DPCA', date: '2024-08-20' },
]

export default function TierProgressPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }
    
    const tierLevels = Object.keys(TIER_DETAILS) as TierLevel[];

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
                        <CardDescription>A detailed summary of the requirements and benefits for each tier.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {tierLevels.map(level => {
                            const tier = TIER_DETAILS[level];
                            return (
                                <div key={level}>
                                    <h3 className="font-bold text-lg text-primary">{tier.name} ({tier.commission}%)</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
                                    
                                    <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 space-y-1">
                                        {tier.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}
                                    </ul>
                                </div>
                            )
                        })}
                         <div className="pt-4 border-t">
                            <h4 className="font-semibold text-sm">Important Note:</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                ProMo MEA Affiliates aren't allowed to Market or be or become affiliates for other event ticketing or entertainment platforms.
                            </p>
                        </div>
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
