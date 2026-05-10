'use client';
import { useState } from 'react';

export default function ProductImageGallery({
  image,
  images,
}: {
  image: string;
  images?: string[];
}) {
  const allImages = [image, ...(images || [])].filter(Boolean);
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div
        className="relative overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          src={allImages[selected]}
          alt="Product"
          className={`w-full h-80 md:h-96 object-contain bg-white p-4 transition-transform duration-300 ${
            zoomed ? 'scale-150' : 'scale-100'
          }`}
        />
        {zoomed && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            🔍 Zoom
          </div>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto bg-dark-700">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selected === i
                  ? 'border-brand-500'
                  : 'border-dark-500 hover:border-dark-400'
              }`}
            >
              <img
                src={img}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}