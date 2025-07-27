
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { updatePayoutSettingsAction } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface PayoutSettingsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
}

export default function PayoutSettingsDialog({
  isOpen,
  setIsOpen,
  user,
}: PayoutSettingsDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState(user.payout_method || '');
  const [payoutDetail, setPayoutDetail] = useState(user.payout_detail || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('userId', user.id);

    const result = await updatePayoutSettingsAction(formData);

    setLoading(false);

    if (result.success) {
      toast({
        title: 'Success!',
        description: 'Your payout settings have been updated.',
      });
      setIsOpen(false);
      // Refresh the page to show new data.
      // A more advanced solution might re-fetch data without a full reload.
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error updating settings',
        description: result.error || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payout Settings</DialogTitle>
          <DialogDescription>
            Manage your payout method and details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="payout_method">Payout Method</Label>
            <Select
              name="payout_method"
              value={payoutMethod}
              onValueChange={setPayoutMethod}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="venmo">Venmo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="payout_detail">Payout Details</Label>
            <Input
              id="payout_detail"
              name="payout_detail"
              value={payoutDetail}
              onChange={(e) => setPayoutDetail(e.target.value)}
              placeholder={
                payoutMethod === 'paypal'
                  ? 'your.paypal@email.com'
                  : payoutMethod === 'venmo'
                  ? '@your-venmo-handle'
                  : 'Account & Routing Number'
              }
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
