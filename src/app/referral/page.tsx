
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReferralPage() {
  const { toast } = useToast();
  const referralCode = "JESSWANG25";
  const referralLink = `https://myeventadvisor.com/promo?ref=${referralCode}`;

  const handleCopy = (textToCopy: string, fieldName: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to Clipboard!",
      description: `${fieldName} has been copied.`,
    });
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
          <div className="flex gap-2">
            <Input readOnly value={referralCode} className="text-lg font-mono bg-muted"/>
            <Button size="icon" variant="outline" onClick={() => handleCopy(referralCode, 'Referral Code')}>
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy Code</span>
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
          <div className="flex gap-2">
            <Input readOnly value={referralLink} className="bg-muted"/>
             <Button size="icon" variant="outline" onClick={() => handleCopy(referralLink, 'Referral Link')}>
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy Link</span>
            </Button>
             <Button size="icon" variant="outline">
              <Share2 className="h-5 w-5" />
               <span className="sr-only">Share Link</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
