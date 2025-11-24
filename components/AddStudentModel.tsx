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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { addStudent } from "@/lib/slices/studentsSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@/common/useMediaQuery";

const createStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).label("Name"),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .label("Phone Number"),
  address: Joi.string().optional().allow("").label("Address"),
  fee: Joi.string().required().label("Fee"),
  startTime: Joi.string().required().label("Start Time"),
  endTime: Joi.string().required().label("End Time"),
  joinDate: Joi.string().required().label("Joining Date"),
});

export function AddStudentModel({
  setIsAction,
}: {
  setIsAction: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(createStudentSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        timing: `${data.startTime} - ${data.endTime}`,
      };
      delete payload.startTime;
      delete payload.endTime;
      const res = await dispatch(addStudent(payload));

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Student added successfully 🎉");
        setIsLoading(false);
        reset();
        setOpen(false);
        setIsAction(true);
      } else {
        toast.error("Failed to add student");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error in Add student :", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="flex items-center justify-center"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        {isMobile ? <Plus className="inline-block w-4 h-4 " /> : "Add Student"}
      </Button>

      <DialogContent
        className="
    sm:max-w-[450px]
    w-[95vw]
    max-h-[90vh]
    overflow-y-auto
    sm:rounded-xl
    rounded-t-2xl
    p-4
  "
      >
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Add a new student to the system. Fill all required fields below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-3 ">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message?.toString()}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="phone">Phone No</Label>
            <Input
              id="phone"
              maxLength={10}
              minLength={10}
              placeholder="Enter 10-digit phone"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message?.toString()}
              </p>
            )}
          </div>

          {/* Fee */}

          <div className="flex items-start md:flex-row flex-col md:items-center  gap-2">
            <div className="flex flex-col gap-2 w-full ">
              <Label htmlFor="fee">Fee</Label>
              <Input
                id="fee"
                placeholder="Enter fee amount"
                {...register("fee")}
              />
              {errors.fee && (
                <p className="text-red-500 text-sm">
                  {errors.fee.message?.toString()}
                </p>
              )}
            </div>

            {/* Join Date */}
            <div className="flex flex-col gap-2 w-full ">
              <Label htmlFor="joinDate">Joining Date</Label>
              <Input id="joinDate" type="date" {...register("joinDate")} />
              {errors.joinDate && (
                <p className="text-red-500 text-sm">
                  {errors.joinDate.message?.toString()}
                </p>
              )}
            </div>
          </div>

          {/* Timing */}
          <div className="flex flex-col gap-2 ">
            <Label>Timing</Label>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2  w-1/2">
                <Label
                  htmlFor="startTime"
                  className="text-xs mx-1 text-gray-500"
                >
                  Start Time
                </Label>
                <Input type="time" id="startTime" {...register("startTime")} />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {errors.startTime.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  w-1/2">
                <Label htmlFor="endTime" className="text-xs mx-1 text-gray-500">
                  End Time
                </Label>
                <Input type="time" id="endTime" {...register("endTime")} />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">
                    {errors.endTime.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">
                {errors.address.message?.toString()}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-[#165dfc] text-white"
            >
              Save Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
