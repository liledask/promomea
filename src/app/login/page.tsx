
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle authentication
        // For now, we'll just redirect to the dashboard
        router.push('/dashboard');
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
       <div className="w-full max-w-md p-4">
         <Card>
            <form onSubmit={handleLogin}>
                <CardHeader className="text-center">
                      <Link href="/" className="flex items-center gap-2 justify-center mb-2">
                        <span className="font-headline text-xl font-bold">ProMo MEA</span>
                    </Link>
                    <CardTitle>Welcome Back!</CardTitle>
                    <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                             <Link href="#" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit">Log In</Button>
                     <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </form>
         </Card>
       </div>
    </div>
  )
}
