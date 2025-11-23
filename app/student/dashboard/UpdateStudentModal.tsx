"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { editStudent } from "@/lib/slices/studentsSlice";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  value: any;
}

export default function StudentModal({
  open,
  onClose,
  onSubmit,
  value,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: value?.name || "",
    phone: value?.phone || "",
    address: value?.studentData?.address || "",
    profileImg: null as File | null,
  });

  useEffect(() => {
    setFormData({
      name: value?.name || "",
      phone: value?.phone || "",
      address: value?.studentData?.address || "",
      profileImg: null as File | null,
    });
    setPreview(value?.avtar || null);
  }, [value]);

  if (!open) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ ...formData, profileImg: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formDataState = new FormData();
    formDataState.append("name", formData.name);
    formDataState.append("phone", formData.phone);
    formDataState.append("address", formData.address);
    if (formData.profileImg) {
      formDataState.append("profileImg", formData.profileImg);
    }

    try {
      const res = await dispatch(
        editStudent({ id: value?.studentData._id, updates: formDataState })
      );

      if (res.meta.requestStatus === "fulfilled") {
        toast.success(" updated successfully");
        onClose();
      } else {
        toast.error("Failed to update student");
      }
    } catch (error) {}
    onClose();
  };

  console.log("value", value);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative modal">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Update Student</h2>

        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
              alt="avatar"
            />

            {/* Pencil Icon Overlay */}
            <label className="absolute bottom-1 right-1 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90">
              <Pencil size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <Label className="mb-1 block">Name</Label>
          <Input
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <Label className="mb-1 block">Phone</Label>
          <Input
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <Label className="mb-1 block">Address</Label>
          <textarea
            rows={3}
            placeholder="Enter address"
            value={formData.address}
            className="w-full border p-3 rounded-md bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
