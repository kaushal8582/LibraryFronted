"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

import { uploadImageGlobal } from "@/lib/slices/studentsSlice";
import { updateAccount } from "@/lib/slices/settingsSlice";
import toast from "react-hot-toast";
import { UserFullData } from "@/lib/slices/authSlice";

interface HeroImageUploaderProps {
  defaultImage?: string;
  onSave?: (url: string | null) => void;
  id : string;
  value :UserFullData | null;
}

export default function HeroImageUploader({
  defaultImage,
  onSave,
  id,
  value
}: HeroImageUploaderProps) {

  const dispatch = useDispatch<AppDispatch>();
  console.log("value data ", value);
 
  // States
  const [preview, setPreview] = useState<string | null>(value?.libraryData?.heroImg || null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(value?.libraryData?.heroImg || null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPreview(value?.libraryData?.heroImg || null);
  }, [value]);

  // When selecting a file
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview first
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("img", file);

      const res = await dispatch(uploadImageGlobal(formData));

      if (res.meta.requestStatus === "fulfilled") {
        const url = res.payload?.data || res.payload; 
        setUploadedUrl(url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed");
      }
    } catch {
      toast.error("Upload error");
    }

    setUploading(false);
  };

  // Remove image
  const removeImage = () => {
    setPreview(null);
    setUploadedUrl(null);
  };

 


  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await dispatch(
        updateAccount({
          libraryId: id,
          data: {
            heroImg: uploadedUrl || null,
          },
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        setSaving(false);
        toast.success("Account updated successfully");
      }
    } catch (error) {
      setSaving(false);
      console.error("Failed to update account:", error);
    }
  };

  return (
    <Card className="px-4 py-5 rounded-xl border border-gray-200 shadow-sm space-y-4 bg-white">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg text-gray-800">Hero Image</h1>

        <Button
          disabled={saving || uploading}
          onClick={handleUpdateAccount}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>

      {/* Upload Box */}
      <label className="relative border rounded-lg h-56 overflow-hidden flex items-center justify-center cursor-pointer bg-gray-100 group">

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* If Preview Available */}
        {preview ? (
          <>
            <img src={preview} className="object-cover w-full h-full opacity-80" />

            {/* Overlay To Replace Image */}
            {!uploading && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-sm font-medium">
                <Upload className="w-5 h-5" />
                <span>Change Image</span>
              </div>
            )}

            {/* Loader When Uploading */}
            {uploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Remove Button */}
            {!uploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          // Default Upload UI
          <div className="flex flex-col items-center justify-center text-gray-600">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-gray-700" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-500" />
                <p className="text-sm mt-2">
                  Drag & Drop or{" "}
                  <span className="text-blue-600 font-medium">Upload Image</span>
                </p>
              </>
            )}
          </div>
        )}
      </label>
    </Card>
  );
}
