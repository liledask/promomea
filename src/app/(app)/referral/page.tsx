
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

const meaUrl = process.env.NEXT_PUBLIC_MEA_URL || 'https://www.myeventadvisor.com';

export default function ReferralPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  const referralCode = user.promo_id;
  const referralLink = `${meaUrl}/promo?ref=${referralCode}`;

  const handleCopy = (textToCopy: string, fieldName: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to Clipboard!",
      description: `${fieldName} has been copied.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join the My Event Advisor Platform!',
          text: 'Use my referral link to sign up as an event organizer on My Event Advisor.',
          url: referralLink,
        });
        toast({ title: 'Link Shared!', description: 'Your referral link has been shared.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Share Failed', description: 'Could not share the link.' });
      }
    } else {
        // Fallback for browsers that do not support the Web Share API
        handleCopy(referralLink, 'Referral Link');
        toast({ title: 'Link Copied!', description: 'Web Share not supported. Link copied to clipboard instead.' });
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold">Refer Event Organizers</h1>
        <p className="text-muted-foreground">Share your code and link with event organizers to earn commissions from their ticket sales.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code with event organizers. They will be prompted to enter it when they sign up on My Event Advisor.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input readOnly value={referralCode} className="text-lg font-mono bg-muted flex-grow"/>
            <Button onClick={() => handleCopy(referralCode, 'Referral Code')} className="shrink-0 w-full sm:w-auto">
              <Copy className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">Copy Code</span>
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link directly with organizers. Anyone who signs up through it will be automatically attributed to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input readOnly value={referralLink} className="bg-muted flex-grow"/>
             <div className="flex gap-2 justify-end w-full sm:w-auto">
                <Button variant="outline" onClick={() => handleCopy(referralLink, 'Referral Link')} className="shrink-0 flex-1 sm:flex-initial">
                    <Copy className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button variant="outline" onClick={handleShare} className="shrink-0 flex-1 sm:flex-initial">
                    <Share2 className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                </Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
