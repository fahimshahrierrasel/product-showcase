'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  mainImage: string;
}

export function ProductGallery({ images, mainImage }: ProductGalleryProps) {
  const allImages = [mainImage, ...images];
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={selectedImage}
          alt="Product image"
          className="h-full w-full object-cover p-4"
        />
      </div>
      <div className="flex gap-4 overflow-auto pb-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white",
              selectedImage === image ? "ring-2 ring-black" : "hover:ring-2 hover:ring-gray-200"
            )}
            onClick={() => setSelectedImage(image)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="h-full w-full object-cover p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
