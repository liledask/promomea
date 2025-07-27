
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser } from "@/lib/data"

export default function ReferralPage() {
  const { toast } = useToast();
  const user = getCurrentUser();
  const referralCode = user.referralCode;
  const referralLink = `https://myeventadvisor.com/promo?ref=${referralCode}`;

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
          title: 'Join ProMo MEA!',
          text: 'Use my referral link to sign up for the ProMo MEA affiliate program.',
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
        <h1 className="text-3xl font-headline font-bold">Referral Code & Link</h1>
        <p className="text-muted-foreground">Share your code and link to earn commissions when new users sign up.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code with potential new affiliates. They will be prompted to enter it during sign-up.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input readOnly value={referralCode} className="text-lg font-mono bg-muted flex-grow"/>
            <Button size="icon" variant="outline" onClick={() => handleCopy(referralCode, 'Referral Code')} className="shrink-0 w-full sm:w-auto">
              <Copy className="h-5 w-5" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Copy Code</span>
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link directly. Anyone who signs up through it will be automatically attributed to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input readOnly value={referralLink} className="bg-muted flex-grow"/>
             <div className="flex gap-2 justify-end">
                <Button size="icon" variant="outline" onClick={() => handleCopy(referralLink, 'Referral Link')} className="shrink-0">
                    <Copy className="h-5 w-5" />
                    <span className="sr-only">Copy Link</span>
                    </Button>
                <Button size="icon" variant="outline" onClick={handleShare} className="shrink-0">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share Link</span>
                </Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
