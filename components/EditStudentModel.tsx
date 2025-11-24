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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editStudent } from "@/lib/slices/studentsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import toast from "react-hot-toast";
import { useState } from "react";

const editStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).label("Name"),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .label("Phone Number"),
  address: Joi.string().optional().allow("").label("Address"),
  fee: Joi.string().optional().label("Fee"),
  joinDate: Joi.string().optional().label("Join Date"),
  status: Joi.string()
    .valid("active", "inactive", "suspended")
    .required()
    .label("Status"),
  startTime: Joi.string().optional().label("Start Time"),
  endTime: Joi.string().optional().label("End Time"),
});

export function EditStudentModel({
  student,
  setIsAction,
}: {
  student: any;
  setIsAction: (isAction: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: joiResolver(editStudentSchema),
    defaultValues: {
      name: student?.user?.name || "",
      email: student?.user?.email || "",
      phone: student?.user?.phone || "",
      address: student?.address || "",
      fee: student?.fee || "",
      status: student?.status || "active",
      joinDate: student?.joinDate?.split("T")[0] || "",
      startTime: student?.timing?.split(" - ")[0] || "",
      endTime: student?.timing?.split(" - ")[1] || "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      timing:
        data.startTime && data.endTime
          ? `${data.startTime} - ${data.endTime}`
          : student?.timing,
    };
    delete payload.startTime;
    delete payload.endTime;

    try {
      setIsLoading(true);
      const res = await dispatch(
        editStudent({ id: student._id, updates: payload })
      );

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Student updated successfully");
        setIsLoading(false);
        reset(payload);
        setOpen(false);
        setIsAction(true);
      } else {
        toast.error("Failed to update student");
        setIsLoading(false);
      }

      console.log("📝 Updated Student Data:", payload);
      reset(payload);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to update student");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          className="h-10 px-4 text-sm w-full "
          variant="ghost"
        >
          Edit Student
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-[450px]"
      >
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update student information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {String(errors.name.message || "")}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {String(errors.email.message || "")}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {String(errors.phone.message || "")}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={watch("status")}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            {errors.status && (
              <p className="text-red-500 text-sm">
                {String(errors.status.message || "")}
              </p>
            )}
          </div>

          {/* Fee */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="fee">Fee</Label>
            <Input id="fee" {...register("fee")} />
            {errors.fee && (
              <p className="text-red-500 text-sm">
                {String(errors.fee.message || "")}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="joinDate">Joining Date</Label>
            <Input type="date" id="joinDate" {...register("joinDate")} />
            {errors.joinDate && (
              <p className="text-red-500 text-sm">
                {String(errors.joinDate.message || "")}
              </p>
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-red-500 text-sm">
                {String(errors.address.message || "")}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" isLoading={isLoading} className="w-full bg-[#165dfc] text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
