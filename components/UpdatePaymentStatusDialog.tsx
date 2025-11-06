"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UpdatePaymentStatusDialog({ payment }: { payment: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Payment Status</DialogTitle>
          <DialogDescription>
            Update the payment status for {payment.studentName}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}