
'use client'

import { useAuth } from '@/hooks/use-auth';
import PersonalBalance from '@/components/dashboard/personal-balance';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, DollarSign, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import EarningsChart from "@/components/my-earnings/earnings-chart"
import { Separator } from "@/components/ui/separator"

const payouts = [
  {
    date: "2025-06-15",
    amount: 1250.00,
    status: "Paid",
    method: "Direct Deposit",
  },
  {
    date: "2025-05-15",
    amount: 975.50,
    status: "Paid",
    method: "Direct Deposit",
  },
  {
    date: "2025-04-16",
    amount: 1100.25,
    status: "Paid",
    method: "Direct Deposit",
  },
    {
    date: "2025-03-15",
    amount: 850.00,
    status: "Paid",
    method: "Direct Deposit",
  },
];

export default function MyEarningsPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-bold">My Earnings</h1>
        <p className="text-sm text-muted-foreground">Review your earnings, payouts, and financial performance.</p>
      </div>

      <PersonalBalance user={user} />
      
      <EarningsChart />

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <CardTitle className="text-xl">Payout History</CardTitle>
                <CardDescription>
                    A record of all your processed payments.
                </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts.map((payout, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
                    <div className="flex-1 space-y-2">
                        <p className="text-lg font-bold text-primary flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            <span>${payout.amount.toFixed(2)}</span>
                        </p>
                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(payout.date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> {payout.method}</span>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm py-1 px-3 self-start sm:self-center whitespace-nowrap">
                      {payout.status}
                    </Badge>
                </div>
                {index < payouts.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
