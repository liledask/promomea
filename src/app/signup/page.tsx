
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'Please enter your full name.',
      });
      return;
    }
    setLoading(true);

    try {
      const avatarChar = name ? name.charAt(0).toUpperCase() : 'A';
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            avatar_url: `https://placehold.co/100x100.png?text=${avatarChar}`,
          },
        },
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Signup Failed',
          description: error.message,
        });
      } else if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
            // This case can happen with email provider rules (e.g. Mailinator)
            toast({
                variant: 'destructive',
                title: 'Signup Error',
                description: "This email address is not allowed.",
            });
        } else {
             toast({
                title: 'Check your email!',
                description: 'We sent you a verification link. Please check your inbox to continue.',
            });
            router.push('/login');
        }
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred.',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-4">
        <Card>
          <form onSubmit={handleSignup}>
            <CardHeader className="text-center">
              <Link
                href="/"
                className="flex items-center gap-2 justify-center mb-2"
              >
                <span className="font-headline text-xl font-bold">
                  ProMo MEA
                </span>
              </Link>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Join the ProMo MEA Affiliate Program today.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jessica Wang"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
