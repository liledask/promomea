
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddEventDialog } from "@/components/my-events/add-event-dialog";
import type { ProMoEvent } from "@/lib/types";
import Link from "next/link";

const initialEvents: ProMoEvent[] = [
  {
    id: "mea-annual-conference-2025",
    name: "MEA Annual Conference 2025",
    date: "2025-10-15",
    commission: 45.75,
    status: "Completed",
  },
  {
    id: "tech-innovators-summit",
    name: "Tech Innovators Summit",
    date: "2025-11-05",
    commission: 22.50,
    status: "Completed",
  },
  {
    id: "marketing-mastery-workshop",
    name: "Marketing Mastery Workshop",
    date: "2025-11-20",
    commission: 0,
    status: "Upcoming",
  },
    {
    id: "future-of-work-expo",
    name: "Future of Work Expo",
    date: "2025-12-01",
    commission: 0,
    status: "Upcoming",
  },
  {
    id: "design-thinking-bootcamp",
    name: "Design Thinking Bootcamp",
    date: "2024-09-30",
    commission: 15.00,
    status: "Completed",
  },
];

export default function MyEventsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [events, setEvents] = useState<ProMoEvent[]>(initialEvents);

  const handleAddEvent = (newEvent: Omit<ProMoEvent, 'commission' | 'status' | 'id'>) => {
    const eventToAdd: ProMoEvent = {
        ...newEvent,
        id: newEvent.name.toLowerCase().replace(/\s+/g, '-'),
        commission: 0,
        status: 'Upcoming',
    };
    setEvents(prevEvents => [eventToAdd, ...prevEvents]);
  };

  return (
    <>
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold">My Events</h1>
            <p className="text-muted-foreground">Track and manage all the events you&apos;ve added.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2" />
            Add New Event
        </Button>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
          <CardDescription>
            A list of all events you have successfully referred to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Commission Earned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={event.status === 'Completed' ? 'secondary' : 'outline'}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {event.commission > 0 ? `$${event.commission.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`https://myeventadvisor.com/events/${event.id}`} target="_blank" title="View on MEA">
                           <Eye className="h-4 w-4" />
                           <span className="sr-only">View on MEA</span>
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    <AddEventDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onAddEvent={handleAddEvent}
    />
    </>
  );
}
