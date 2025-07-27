
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabaseClient';
import type { ProMoEvent } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { DollarSign, UserPlus, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Activity {
    icon: React.ElementType;
    description: string;
    time: string;
}

export default function ActivityFeed() {
    const { user } = useAuth();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            if (!user) return;

            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (error) {
                    throw error;
                }

                const fetchedActivities = data.map(event => ({
                    icon: DollarSign,
                    description: `You earned $${event.commission.toFixed(2)} commission from "${event.name}".`,
                    time: formatDistanceToNow(new Date(event.created_at), { addSuffix: true }),
                }));
                
                setActivities(fetchedActivities);

            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchActivities();
        }
    }, [user]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Skeleton className="h-9 w-9 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-3 w-1/4" />
                                </div>
                            </div>
                        ))
                    ) : activities.length > 0 ? (
                        activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <Avatar className="h-9 w-9 bg-secondary flex items-center justify-center">
                                    <activity.icon className="h-5 w-5 text-secondary-foreground" />
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No recent activity to display.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
