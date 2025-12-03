"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface HeroImageUploaderProps {
  defaultImage?: string;
  isLoading?: boolean;
  onSave?: (file: File | null) => void;
}

export default function HeroImageUploader({
  defaultImage,
  isLoading = false,
  onSave,
}: HeroImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    setPreview(URL.createObjectURL(uploaded));
    setFile(uploaded);
  };

  const removeImage = () => {
    setPreview(null);
    setFile(null);
  };

  const handleSave = () => {
    if (onSave) onSave(file);
  };

  return (
    <Card className="px-4 py-5 rounded-xl border border-gray-200 shadow-sm space-y-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg text-gray-800">Hero Image</h1>

        <Button
          disabled={isLoading}
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Upload Box */}
      <label className="relative border rounded-lg h-56 overflow-hidden flex items-center justify-center cursor-pointer bg-gray-100 group">
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />

        {/* Uploaded Preview */}
        {preview ? (
          <>
            <img src={preview} className="object-cover w-full h-full opacity-80" />

            {/* Replace Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-sm font-medium">
              <Upload className="w-5 h-5" />
              <span>Change Image</span>
            </div>

            {/* Remove Button */}
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
          </>
        ) : (
          // Default Upload State
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Upload className="w-6 h-6 text-gray-500" />
            <p className="text-sm mt-2">
              Drag & Drop or{" "}
              <span className="text-blue-600 font-medium">Upload Image</span>
            </p>
          </div>
        )}
      </label>
    </Card>
  );
}
