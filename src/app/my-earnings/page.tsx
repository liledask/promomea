
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
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import EarningsChart from "@/components/my-earnings/earnings-chart"

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-bold">My Earnings</h1>
        <p className="text-sm text-muted-foreground">Review your earnings, payouts, and financial performance.</p>
      </div>
      
      <EarningsChart />

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <CardTitle className="text-xl">Payout History</CardTitle>
                <CardDescription>
                    A record of all your processed payments.
                </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Payout Date</TableHead>
                  <TableHead className="whitespace-nowrap">Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.date}>
                    <TableCell className="whitespace-nowrap">{new Date(payout.date).toLocaleDateString()}</TableCell>
                    <TableCell className="whitespace-nowrap">{payout.method}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">{payout.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap">${payout.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
