// /app/components/PropertyMediaGallery.jsx
'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

// This is the new, independent component.
// It takes images, videos, and a title as props.
export default function PropertyMediaGallery({ images, videos, title }) {
  // 1. Logic to combine and filter media is now self-contained.
  const mediaItems = useMemo(() => {
    const imageItems = images?.filter(url => url).map(url => ({ type: 'image', url })) || [];
    const videoItems = videos?.filter(url => url).map(url => ({ type: 'video', url })) || [];
    return [...imageItems, ...videoItems];
  }, [images, videos]);

  // 2. State management for the selected media is handled internally.
  const [selectedMedia, setSelectedMedia] = useState(mediaItems[0] || { type: 'image', url: '/fallback-image.png' });

  // 3. It handles the "no media" case gracefully.
  if (mediaItems.length === 0) {
    return (
      <div className="lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-gray-100">
          <Image
            src="/fallback-image.png"
            alt="No media available"
            fill
            className="object-contain p-4"
          />
        </div>
      </div>
    );
  }

  // 4. The rendering logic is entirely within this component.
  return (
    <div className="lg:col-span-2">
      {/* Main Display Area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-black">
        {selectedMedia.type === 'image' ? (
          <Image
            src={selectedMedia.url}
            alt={title || 'Property Image'}
            fill
            className="object-contain" // Correctly uses fill
            priority
            sizes="(max-width: 1024px) 100vw, 67vw"
          />
        ) : (
          <video
            key={selectedMedia.url}
            src={selectedMedia.url}
            className="h-full w-full object-contain"
            controls
            autoPlay
            muted
          />
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {mediaItems.map((media, index) => (
          <button
            key={index}
            onClick={() => setSelectedMedia(media)}
            className={`relative aspect-square w-full rounded-lg overflow-hidden border-2 transition-all ${selectedMedia.url === media.url ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100 hover:border-amber-400'}`}
          >
            {media.type === 'image' ? (
              <Image
                src={media.url}
                alt={`${title || 'Thumbnail'} ${index + 1}`}
                fill
                className="object-cover" // Correctly uses fill for thumbnails
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
              />
            ) : (
              <>
                <video
                  src={`${media.url}#t=0.1`}
                  className="h-full w-full object-cover bg-black"
                  preload="metadata"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlayCircle className="h-8 w-8 text-white/80" />
                </div>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}