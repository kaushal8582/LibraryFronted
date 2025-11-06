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

const editStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).label("Name"),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  phone: Joi.string().pattern(/^\d{10}$/).optional().label("Phone Number"),
  address: Joi.string().optional().allow("").label("Address"),
  fee: Joi.string().optional().label("Fee"),
  startTime: Joi.string().optional().label("Start Time"),
  endTime: Joi.string().optional().label("End Time"),
});

export function EditStudentModel({ student }: { student: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(editStudentSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      phone: student?.phone || "",
      address: student?.address || "",
      fee: student?.fee || "",
      // Extract start and end times from stored timing if available
      startTime: student?.timing?.split(" - ")[0] || "",
      endTime: student?.timing?.split(" - ")[1] || "",
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      timing: data.startTime && data.endTime ? `${data.startTime} - ${data.endTime}` : student?.timing,
    };
    delete payload.startTime;
    delete payload.endTime;

    console.log("📝 Updated Student Data:", payload);
    reset(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update student information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{String(errors.name.message || "")}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{String(errors.email.message || "")}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{String(errors.phone.message || "")}</p>
            )}
          </div>

          {/* Fee */}
          <div className="flex flex-col">
            <Label htmlFor="fee">Fee</Label>
            <Input id="fee" {...register("fee")} />
            {errors.fee && (
              <p className="text-red-500 text-sm">{String(errors.fee.message || "")}</p>
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
                    {String(errors.startTime.message || "")}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <Label htmlFor="endTime" className="text-xs text-gray-500">
                  End Time
                </Label>
                <Input type="time" id="endTime" {...register("endTime")} />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">
                    {String(errors.endTime.message || "")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-red-500 text-sm">{String(errors.address.message || "")}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
