"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { X } from "lucide-react";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { editStudent } from "@/lib/slices/studentsSlice";
import { updateUsername, checkUsernameAvailability } from "@/lib/slices/authSlice";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import { useDebounce } from "@/common/debounce";

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
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(value?.username || "");
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: "" });
  
  const debouncedUsername = useDebounce(username, 500);
  
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
    setUsername(value?.username || "");
    setPreview(value?.avtar || null);
    setUsernameStatus({ checking: false, available: null, message: "" });
  }, [value]);

  // Check username availability when debounced value changes
  useEffect(() => {
    const checkUsername = async () => {
      if (!debouncedUsername || debouncedUsername.length < 3) {
        setUsernameStatus({ checking: false, available: null, message: "" });
        return;
      }

      // Don't check if username hasn't changed from original
      if (debouncedUsername === value?.username) {
        setUsernameStatus({ checking: false, available: true, message: "Current username" });
        return;
      }

      // Validate format
      if (!/^[a-z0-9_]+$/.test(debouncedUsername)) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: "Only lowercase letters, numbers, and underscores allowed",
        });
        return;
      }

      setUsernameStatus({ checking: true, available: null, message: "Checking..." });

      try {
        const response = await dispatch(checkUsernameAvailability(debouncedUsername));
        if (response.meta.requestStatus === "fulfilled") {
          setUsernameStatus({
            checking: false,
            available: response.payload.available,
            message: response.payload.message,
          });
        } else {
          setUsernameStatus({
            checking: false,
            available: false,
            message: response.payload || "Error checking username",
          });
        }
      } catch (error: any) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: error.message || "Error checking username",
        });
      }
    };

    checkUsername();
  }, [debouncedUsername, value?.username, dispatch]);

  if (!open) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ ...formData, profileImg: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    // Validate username if it has changed
    if (username !== value?.username) {
      if (username.length < 3) {
        toast.error("Username must be at least 3 characters");
        return;
      }
      if (!/^[a-z0-9_]+$/.test(username)) {
        toast.error("Username can only contain lowercase letters, numbers, and underscores");
        return;
      }
      if (usernameStatus.checking) {
        toast.error("Please wait while we check username availability");
        return;
      }
      if (usernameStatus.available === false) {
        toast.error(usernameStatus.message || "Username is not available");
        return;
      }
    }

    setIsLoading(true);
    const formDataState = new FormData();
    formDataState.append("name", formData.name);
    formDataState.append("phone", formData.phone);
    formDataState.append("address", formData.address);
    if (formData.profileImg) {
      formDataState.append("profileImg", formData.profileImg);
    }

    try {
      // Update profile
      const res = await dispatch(
        editStudent({ id: value?.studentData._id, updates: formDataState })
      );

      // Update username if it has changed
      if (username !== value?.username && usernameStatus.available) {
        const usernameRes = await dispatch(updateUsername(username));
        if (usernameRes.meta.requestStatus === "fulfilled") {
          toast.success("Profile and username updated successfully");
        } else {
          toast.error(usernameRes.payload || "Failed to update username");
        }
      } else if (res.meta.requestStatus === "fulfilled") {
        toast.success("Profile updated successfully");
      }

      if (res.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        onClose();
      } else {
        toast.error("Failed to update profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };



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

        {/* Username */}
        <div className="mb-4">
          <Label className="mb-1 block">Username</Label>
          <div className="relative">
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                setUsername(val);
              }}
              maxLength={30}
              className={usernameStatus.available === false ? "border-red-500" : usernameStatus.available === true ? "border-green-500" : ""}
            />
            {username && username.length >= 3 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {usernameStatus.checking ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : usernameStatus.available === true ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : usernameStatus.available === false ? (
                  <XCircle className="h-4 w-4 text-red-500" />
                ) : null}
              </div>
            )}
          </div>
          {username && (
            <p className={`text-xs mt-1 ${
              usernameStatus.available === true ? "text-green-600" :
              usernameStatus.available === false ? "text-red-600" :
              usernameStatus.checking ? "text-gray-500" :
              "text-gray-500"
            }`}>
              {usernameStatus.message || (username.length < 3 ? "Username must be at least 3 characters" : "")}
            </p>
          )}
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
          disabled={isLoading || (username !== value?.username && (usernameStatus.checking || usernameStatus.available === false))}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? <ButtonLoader/> : "Save"}
        </Button>
      </div>
    </div>
  );
}