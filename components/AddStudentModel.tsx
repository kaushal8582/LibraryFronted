"use client";
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

const createStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).label("Name"),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  phone: Joi.string().pattern(/^\d{10}$/).required().label("Phone Number"),
  address: Joi.string().optional().allow("").label("Address"),
  fee: Joi.string().required().label("Fee"),
  startTime: Joi.string().required().label("Start Time"),
  endTime: Joi.string().required().label("End Time"),
});

export function AddStudentModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(createStudentSchema),
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      timing: `${data.startTime} - ${data.endTime}`,
    };
    delete payload.startTime;
    delete payload.endTime;

    console.log("📦 Final Data Sent to Backend:", payload);

    



    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Add a new student to the system. Fill all required fields below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message?.toString()}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <Label htmlFor="phone">Phone No</Label>
            <Input
              id="phone"
              placeholder="Enter 10-digit phone"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message?.toString()}</p>
            )}
          </div>

          {/* Fee */}
          <div className="flex flex-col">
            <Label htmlFor="fee">Fee</Label>
            <Input id="fee" placeholder="Enter fee amount" {...register("fee")} />
            {errors.fee && (
              <p className="text-red-500 text-sm">{errors.fee.message?.toString()}</p>
            )}
          </div>

          {/* Timing */}
          <div className="flex flex-col gap-2">
            <Label>Timing</Label>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <Label htmlFor="startTime" className="text-xs text-gray-500">
                  Start Time
                </Label>
                <Input type="time" id="startTime" {...register("startTime")} />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {errors?.startTime?.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <Label htmlFor="endTime" className="text-xs text-gray-500">
                  End Time
                </Label>
                <Input type="time" id="endTime" {...register("endTime")} />
                {errors?.endTime && (
                  <p className="text-red-500 text-sm">
                    {errors?.endTime?.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors?.address?.message?.toString()}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Save Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
