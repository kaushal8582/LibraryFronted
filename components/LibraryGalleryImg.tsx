"use client";

import { JSX, useState, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { uploadImageGlobal } from "@/lib/slices/studentsSlice";
import { updateAccount } from "@/lib/slices/settingsSlice";
import toast from "react-hot-toast";
import { UserFullData } from "@/lib/slices/authSlice";


export default function LibraryGallery({ id ,value}: { id: string; value : UserFullData | null }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  
  const [images, setImages] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existing = value?.libraryData?.galleryPhotos || [];

    // Convert backend string[] → frontend display structure
    const formatted = existing.map((url: string) => ({
      id: url,
      url: url,
      uploading: false,
    }));

    setImages(formatted);
  }, [value]);

 
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    for (const file of files) {
      if (images.length >= 10) {
        toast.error("Maximum 10 images allowed!");
        break;
      }

      const previewURL = URL.createObjectURL(file);

      setImages((prev) => [
        ...prev,
        { id: previewURL, url: null, uploading: true },
      ]);

      try {
        const formData = new FormData();
        formData.append("img", file);

        const res = await dispatch(uploadImageGlobal(formData));

        if (res.meta.requestStatus === "fulfilled") {
          const cloudUrl = res.payload?.data || res.payload;

          setImages((prev) =>
            prev.map((img) =>
              img.id === previewURL
                ? { ...img, url: cloudUrl, uploading: false }
                : img
            )
          );
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        toast.error("Image upload failed");
        setImages((prev) => prev.filter((img) => img.id !== previewURL));
      }
    }
  };

 
  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

 
  const handleSave = async () => {
    const finalImages = images
      .filter((img) => img.url !== null)
      .map((img) => img.url) as string[];

    setSaving(true);

    const res = await dispatch(
      updateAccount({
        libraryId: id,
        data: { galleryPhotos: finalImages },
      })
    );

    setSaving(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Gallery updated successfully!");
    } else {
      toast.error("Failed to save gallery");
    }
  };

  return (
    <Card className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Library Gallery Photos</h2>

        <Button
          onClick={handleSave}
          disabled={saving}
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

      {/* FIRST TIME BIG DROP ZONE */}
      {images.length === 0 ? (
        <label className="relative border border-dotted rounded-lg h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer bg-gray-50 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Upload className="w-7 h-7 text-gray-600" />
          <span className="text-sm mt-2 text-gray-600">
            Drag & Drop or{" "}
            <span className="text-blue-600 font-medium">Upload</span>
          </span>
        </label>
      ) : (
        <label className="inline-flex items-center w-[150px] gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>Upload More</span>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      )}

      {/* IMAGE GRID */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full h-36 rounded-lg overflow-hidden group bg-gray-100"
            >
              <img src={img.id} className="object-cover w-full h-full opacity-90" />

              {img.uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-white animate-spin" />
                </div>
              )}

              {!img.uploading && (
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
