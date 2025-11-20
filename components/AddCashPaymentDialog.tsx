"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { makePaymentInCash } from "@/lib/slices/paymentsSlice";


const cashPaymentSchema = Joi.object({
  paymentDate: Joi.string().required().label("Payment Date"),
  numberOfMonths: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .required()
    .label("Number of Months"),
});

export function AddCashPaymentModal({
  studentId,
  setIsAction,
}: {
  studentId: string;
  setIsAction: (val: boolean) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(cashPaymentSchema),
    defaultValues: {
      paymentDate: "",
      numberOfMonths: 1,
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      paymentDate: data.paymentDate,
      numberOfMonths: Number(data.numberOfMonths),
      studentId,
    };

    const res = await dispatch(makePaymentInCash(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Cash payment completed");
      setIsAction(true);
      setOpen(false);
      reset();
    } else {
      toast.error("Failed to process cash payment");
    }
  };

  return (
    <Dialog   open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={(e)=>e.stopPropagation()}  style={{height: "40px",width: "100%",padding: "0 12px"}} variant="ghost">Add Cash Payment</Button>
      </DialogTrigger>

      <DialogContent onClick={(e)=>e.stopPropagation()} className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Cash Payment</DialogTitle>
          <DialogDescription>
            Enter payment date and number of months the student is paying for.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Payment Date */}
          <div className="flex flex-col">
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input type="date" id="paymentDate" {...register("paymentDate")} />
            {errors.paymentDate && (
              <p className="text-red-500 text-sm">
                {String(errors.paymentDate.message)}
              </p>
            )}
          </div>

          {/* Number of Months */}
          <div className="flex flex-col">
            <Label htmlFor="numberOfMonths">Number of Months</Label>
            <Input
              type="number"
              id="numberOfMonths"
              min={1}
              max={12}
              {...register("numberOfMonths")}
            />
            {errors.numberOfMonths && (
              <p className="text-red-500 text-sm">
                {String(errors.numberOfMonths.message)}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Add Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
