
'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Eye, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProMoEvent } from "@/lib/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialReferredEvents: ProMoEvent[] = [
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
  const [events, setEvents] = useState<ProMoEvent[]>(initialReferredEvents);
  const [newEventLink, setNewEventLink] = useState("");
  const { toast } = useToast();

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventLink.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Link",
        description: "Please enter a valid event link.",
      });
      return;
    }

    // This is a simulation. In a real app, you would fetch event details from the link.
    const newEvent: ProMoEvent = {
      id: `new-event-${Date.now()}`,
      name: `New Event: ${newEventLink.substring(0, 30)}...`,
      date: new Date().toISOString().split('T')[0], // Today's date
      commission: 0,
      status: 'Upcoming',
    };

    setEvents(prevEvents => [newEvent, ...prevEvents]);
    setNewEventLink("");
    toast({
      title: "Event Added!",
      description: "The new event is now being tracked on your dashboard.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-bold">Your Referred Events</h1>
        <p className="text-sm text-muted-foreground">Track events from organizers you've referred to MEA.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add a New Event</CardTitle>
          <CardDescription>
            Received an event link from an organizer you referred? Paste it here to add it to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEvent} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow space-y-2">
              <Label htmlFor="event-link" className="sr-only">Event Link</Label>
              <Input 
                id="event-link"
                placeholder="https://myeventadvisor.com/events/..." 
                value={newEventLink}
                onChange={(e) => setNewEventLink(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </form>
        </CardContent>
      </Card>

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
