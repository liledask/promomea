
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import type { ProMoEvent } from "@/lib/types";

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<ProMoEvent, 'id' | 'commission' | 'status'>) => void;
}

const eventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters long."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
});

type EventFormData = z.infer<typeof eventSchema>;

export function AddEventDialog({ isOpen, onClose, onAddEvent }: AddEventDialogProps) {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
    });

    const onSubmit = (data: EventFormData) => {
        onAddEvent(data);
        toast({
            title: "Event Added!",
            description: `Successfully added "${data.name}" to your events.`,
        });
        reset();
        onClose();
    };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Add a New Event</DialogTitle>
            <DialogDescription>
                Fill in the details below to add a new event to your referral list.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Event Name
                    </Label>
                    <div className="col-span-3">
                        <Input 
                            id="name" 
                            {...register("name")}
                            className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                        Date
                    </Label>
                     <div className="col-span-3">
                        <Input 
                            id="date" 
                            type="date"
                            {...register("date")}
                            className={errors.date ? "border-destructive" : ""}
                        />
                        {errors.date && <p className="text-xs text-destructive mt-1">{errors.date.message}</p>}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Event</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
