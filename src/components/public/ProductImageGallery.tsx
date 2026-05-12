'use client';
import { useState } from 'react';
import Image from 'next/image'; // استيراد مكون الصور من نكست

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
        className="relative overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <div className={`relative w-full h-80 md:h-96 bg-white p-4 transition-transform duration-300 ${
          zoomed ? 'scale-150' : 'scale-100'
        }`}>
          <Image
            src={allImages[selected]}
            alt="Product image"
            fill // يملأ الحاوية الأب
            priority={true} // أهم سطر: يخبر المتصفح بتحميل هذه الصورة فوراً (LCP fix)
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {zoomed && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
            🔍 Zoom
          </div>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto bg-dark-700 scrollbar-hide">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg relative overflow-hidden border-2 transition-all ${
                selected === i
                  ? 'border-brand-500'
                  : 'border-dark-500 hover:border-dark-400'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}