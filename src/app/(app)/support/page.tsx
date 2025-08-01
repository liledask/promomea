
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { LifeBuoy, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const faqItems = [
    {
        question: "How are my commissions calculated?",
        answer: "Commissions are calculated as a percentage of the ticket sales from events you add to the platform. The percentage depends on your current affiliate tier."
    },
    {
        question: "When do I get paid?",
        answer: "Payouts are processed up to 7 days after an event has concluded. You can track your upcoming payouts in the 'My Earnings' section."
    },
    {
        question: "What happens if I don't meet the tier requirements in time?",
        answer: "For the ProMo Trainee (PT) tier, if you do not add 5 events within 30 days, your progress for tier advancement resets. However, you will continue to earn the 1% commission on any events you have already added."
    },
    {
        question: "How do I track the performance of my referred events?",
        answer: "The 'My Events' page provides a detailed list of all the events you've added, their status, and the commission you've earned from each."
    }
]

export default function SupportPage() {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out both the subject and message fields.",
      });
      return;
    }
    
    // Simulate sending message
    toast({
      title: "Message Sent!",
      description: "Our support team will get back to you shortly.",
    });

    // Reset form
    setSubject("");
    setMessage("");
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Support Center</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          We&apos;re here to help. Find answers to your questions or get in touch with our team.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LifeBuoy /> Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Mail /> Contact Support</CardTitle>
                    <CardDescription>Can&apos;t find an answer? Send us a message.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input 
                                id="subject" 
                                placeholder="e.g., Question about my payout" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea 
                                id="message" 
                                placeholder="Please describe your issue in detail..." 
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </CardContent>
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}
