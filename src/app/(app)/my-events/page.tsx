

'use client';

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge"
import { Eye, CalendarPlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProMoEvent } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/use-auth";

const meaUrl = process.env.NEXT_PUBLIC_MEA_URL || 'https://myeventadvisor.com';

export default function MyEventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<ProMoEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }
        setEvents(data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
        fetchEvents();
    }
  }, [user]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-bold">Your Referred Events</h1>
        <p className="text-sm text-muted-foreground">Track events from organizers you've referred to MEA.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : events.length === 0 ? (
        <Card className="text-center py-12">
             <CardContent className="space-y-4">
                <CalendarPlus className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">No Events Yet</h3>
                <p className="text-muted-foreground">Events from your referred organizers will appear here once they are added.</p>
             </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <Badge variant={event.status === 'Completed' ? 'secondary' : 'outline'} className="whitespace-nowrap">
                      {event.status}
                    </Badge>
                  </div>
                  <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                   <div className="text-sm">
                      <p className="text-muted-foreground">Your Commission</p>
                      <p className="font-bold text-lg text-primary">${event.commission.toFixed(2)}</p>
                   </div>
                </CardContent>
                <CardFooter>
                   <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`${meaUrl}/events/${event.id}`} target="_blank" title="View on MEA">
                        <Eye className="mr-2 h-4 w-4" />
                        View Event on MEA
                      </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
