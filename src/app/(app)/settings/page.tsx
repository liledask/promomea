
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfileAction, updateUserAvatarAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SettingsPage() {
  const { user, loading, refreshUser, setUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('userId', user.id);

    const result = await updateUserProfileAction(formData);

    setIsSaving(false);

    if (result.success && result.data) {
      setUser({ ...user, ...result.data });
      toast({
        title: "Profile Updated",
        description: "Your information has been successfully saved.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.error || "An unexpected error occurred.",
      });
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        if (!publicUrl) {
            throw new Error("Could not get public URL for the uploaded file.");
        }
        
        const result = await updateUserAvatarAction({ userId: user.id, avatarUrl: publicUrl });

        if (result.success && result.data) {
            setUser({ ...user, ...result.data, email: user.email });
            toast({
                title: 'Avatar Updated!',
                description: 'Your new photo has been saved.',
            });
        } else {
            throw new Error(result.error);
        }

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: error.message || "An unexpected error occurred while uploading your photo.",
        });
    } finally {
        setIsUploading(false);
        // Reset file input
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  };
  
  const userInitial = user.full_name ? user.full_name.charAt(0).toUpperCase() : '';

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and notification preferences.</p>
      </div>

      <Card>
        <form onSubmit={handleProfileSave}>
            <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        {isUploading ? (
                             <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                             </div>
                        ) : (
                           <>
                             <AvatarImage src={user.avatar_url || ''} alt={user.full_name || ''} data-ai-hint="profile picture" />
                             <AvatarFallback>{userInitial}</AvatarFallback>
                           </>
                        )}
                    </Avatar>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        className="hidden" 
                        accept="image/png, image/jpeg"
                        disabled={isUploading}
                    />
                    <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Change Photo'}
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={isSaving || isUploading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={user.email || ''} disabled />
                    </div>
                </div>
              <Button type="submit" disabled={isSaving || isUploading}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Profile
              </Button>
            </CardContent>
        </form>
      </Card>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4">
                <div className="flex-grow">
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates on earnings, payouts, and tier progress.</p>
                </div>
                <Switch defaultChecked disabled/>
            </div>
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4">
                <div className="flex-grow">
                    <h4 className="font-medium">Promotional Updates</h4>
                    <p className="text-sm text-muted-foreground">Get news about new bonuses and company announcements.</p>
                </div>
                <Switch disabled/>
            </div>
          <Button disabled>Save Notification Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
