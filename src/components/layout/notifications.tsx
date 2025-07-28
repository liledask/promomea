
'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, Award, DollarSign, CheckCircle } from "lucide-react"

const notifications = [
    {
        icon: <Award className="h-5 w-5 text-yellow-500" />,
        title: "New award unlocked!",
        description: "You've achieved the 'Fast Starter' award.",
        time: "5m ago"
    },
    {
        icon: <DollarSign className="h-5 w-5 text-green-500" />,
        title: "Payout processed",
        description: "Your payout of $1,250.00 has been sent.",
        time: "1h ago"
    },
    {
        icon: <CheckCircle className="h-5 w-5 text-primary" />,
        title: "Tier Upgraded",
        description: "Congratulations! You are now a DPCA.",
        time: "1d ago"
    },
]


export default function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4">
            <h4 className="font-medium text-sm">Notifications</h4>
        </div>
        <div className="space-y-2 p-4 pt-0 border-t border-b">
           {notifications.map((notification, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="flex-shrink-0 mt-1">
                    {notification.icon}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                </div>
                 <p className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</p>
            </div>
           ))}
        </div>
         <div className="p-2 text-center">
            <Button variant="link" size="sm" className="w-full">View all notifications</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
