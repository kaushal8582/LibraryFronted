"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface GalleryProps {
  galleryPhotos?: string[];
}

const defaultImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
];

const GalleryImages = ({ galleryPhotos = defaultImages }: GalleryProps) => {
  const [selected, setSelected] = useState(0);

  const nextImage = () =>
    setSelected((i) => (i + 1) % galleryPhotos.length);

  const prevImage = () =>
    setSelected((i) => (i === 0 ? galleryPhotos.length - 1 : i - 1));


  const getImageInfo = (src: string, index: number) => ({
    id: `image-${index}`,
    src: src,
    alt: `Gallery image ${index + 1}`
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          {/* View All <ChevronRight className="w-4 h-4" /> */}
        </button>
      </div>

 
      {galleryPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <ChevronRight className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No gallery images available</p>
        </div>
      ) : (
        <>
          {/* Main Image */}
          <div className="relative mb-6 group">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src={galleryPhotos[selected]}
                alt={`Gallery image ${selected + 1}`}
                width={800}
                height={450}
                className="w-full h-[60vh] object-cover transition duration-300 group-hover:scale-105"
                priority={selected === 0}
              />

              {/* Desktop Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-4">
                <button
                  onClick={prevImage}
                  className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {selected + 1} / {galleryPhotos.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center flex-wrap gap-3">
            {galleryPhotos.map((photo, i) => (
              <button
                key={`thumbnail-${i}`}
                onClick={() => setSelected(i)}
                className={`aspect-auto w-fit rounded-lg overflow-hidden border-2 transition-all
                  ${
                    selected === i
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300 hover:scale-105"
                  }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${i + 1}`}
                  width={60}
                  height={60}
                  className="w-14 h-14 md:w-20 md:h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Mobile Navigation  */}
      <div className="flex justify-center gap-4 mt-6 md:hidden">
        <button
          onClick={prevImage}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
          aria-label="Previous image"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={nextImage}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GalleryImages;