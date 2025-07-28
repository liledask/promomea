
'use client'

import { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, Award, DollarSign, CheckCircle, Loader2 } from "lucide-react"
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabaseClient';
import type { Notification } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

const iconMap: Record<string, React.ElementType> = {
    award: Award,
    payout: DollarSign,
    tier_upgrade: CheckCircle,
    default: Bell,
};

const iconColorMap: Record<string, string> = {
    award: "text-yellow-500",
    payout: "text-green-500",
    tier_upgrade: "text-primary",
    default: "text-muted-foreground",
}

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);
            
            if (error) {
                console.error("Error fetching notifications:", error);
                throw error;
            }

            setNotifications(data || []);
        } catch (error) {
            // Handle error, maybe show a toast
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        fetchNotifications();
    } else {
        // If there's no user, we're probably logged out, so don't show loading.
        setLoading(false);
    }
  }, [user]);

  const NotificationIcon = ({ type }: { type: string }) => {
    const Icon = iconMap[type] || iconMap.default;
    const color = iconColorMap[type] || iconColorMap.default;
    return <Icon className={`h-5 w-5 ${color}`} />;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
            <h4 className="font-medium text-sm">Notifications</h4>
        </div>
        <div className="space-y-1 p-2 max-h-96 overflow-y-auto">
           {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3 p-2">
                        <Skeleton className="h-5 w-5 mt-1 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-3 w-10" />
                    </div>
                ))
           ) : notifications.length > 0 ? (
            notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex-shrink-0 mt-1">
                        <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{notification.data.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.data.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </p>
                </div>
            ))
           ) : (
             <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">No new notifications.</p>
             </div>
           )}
        </div>
         <div className="p-2 text-center border-t">
            <Button variant="link" size="sm" className="w-full text-xs h-auto py-1">View all notifications</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
