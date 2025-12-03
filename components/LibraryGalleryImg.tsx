import { JSX, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GalleryImage {
  id: string;
  file: File;
}

export default function LibraryGallery(): JSX.Element {
  const [images, setImages] = useState<GalleryImage[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    const newImgs: GalleryImage[] = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    if (images.length + newImgs.length <= 10) {
      setImages((prev) => [...prev, ...newImgs]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <Card className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Library Gallery Photos</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save
        </Button>
      </div>

      {/* ---------- Upload Section ---------- */}
      {images.length === 0 ? (
        // 🌟 FIRST TIME - BIG DRAG & DROP BOX
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
            Drag & Drop or <span className="text-blue-600 font-medium">Upload</span>
          </span>
        </label>
      ) : (
        // 🌟 AFTER FIRST IMAGE — Show small upload button only
        <div>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer">
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
        </div>
      )}

      {/* ---------- Images Grid ---------- */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full h-36 rounded-lg overflow-hidden group"
            >
              <img src={img.id} className="object-cover w-full h-full" />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
