
'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProMoEvent } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const referredEvents: ProMoEvent[] = [
    {
        id: 'mea-annual-conference-2025',
        name: 'MEA Annual Conference 2025',
        date: '2025-10-15',
        commission: 45.75,
        status: 'Completed',
    },
    {
        id: 'tech-innovators-summit',
        name: 'Tech Innovators Summit',
        date: '2025-11-05',
        commission: 22.5,
        status: 'Completed',
    },
    {
        id: 'design-thinking-bootcamp',
        name: 'Design Thinking Bootcamp',
        date: '2024-09-30',
        commission: 15,
        status: 'Completed',
    },
     {
        id: 'marketing-mastery-workshop',
        name: 'Marketing Mastery Workshop',
        date: '2025-11-20',
        commission: 0,
        status: 'Upcoming',
    },
    {
        id: 'future-of-work-expo',
        name: 'Future of Work Expo',
        date: '2025-12-01',
        commission: 0,
        status: 'Upcoming',
    },
];

export default function MyEventsPage() {
  const [events, setEvents] = useState<ProMoEvent[]>(referredEvents);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-bold">Your Referred Events</h1>
        <p className="text-sm text-muted-foreground">Track events from organizers you've referred to MEA.</p>
      </div>

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
                    <Link href={`https://myeventadvisor.com/events/${event.id}`} target="_blank" title="View on MEA">
                      <Eye className="mr-2 h-4 w-4" />
                      View Event on MEA
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
