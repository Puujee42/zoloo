'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// MODIFICATION 1: Props now accept a 'videos' array instead of a 'video' string.
export default function PropertyMediaGallery({ images, videos, title }) {

  // MODIFICATION 2: useMemo logic is updated to handle the 'videos' array.
  const mediaItems = useMemo(() => {
    // Create an array of image objects.
    const imageItems = images?.filter(url => url).map(url => ({ type: 'image', url })) || [];

    // Create an array of video objects from the 'videos' prop.
    const videoItems = videos?.filter(url => url).map(url => ({ type: 'video', url })) || [];

    // Combine them, placing all videos at the beginning of the gallery.
    return [...videoItems, ...imageItems];
  }, [images, videos]); // Update dependencies.

  const [selectedMedia, setSelectedMedia] = useState(
    mediaItems[0] || { type: 'image', url: '/fallback-image.png' }
  );

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

  // --- No further changes are needed below this line ---
  // The rest of the component is already built to handle the generic 'mediaItems' array.

  return (
    <div className="lg:col-span-2">
      {/* Main Display Area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-black">
        <AnimatePresence mode="wait">
          {selectedMedia.type === 'image' ? (
            <motion.div
              key={selectedMedia.url}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={selectedMedia.url}
                alt={title || 'Property Image'}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 67vw"
              />
            </motion.div>
          ) : (
            <motion.div
              key={selectedMedia.url}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <video
                key={selectedMedia.url}
                src={selectedMedia.url}
                className="h-full w-full object-contain"
                controls
                autoPlay
                muted
                loop
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {mediaItems.length > 1 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {mediaItems.map((media, index) => {
            const isSelected = selectedMedia.url === media.url;

            return (
              <motion.button
                key={index}
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                onClick={() => setSelectedMedia(media)}
                className={`relative aspect-square w-full rounded-lg overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-amber-500 scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-amber-400'
                }`}
              >
                {media.type === 'image' ? (
                  <Image
                    src={media.url}
                    alt={`${title || 'Thumbnail'} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                  />
                ) : (
                  <>
                    <video
                      src={`${media.url}#t=0.1`}
                      className="h-full w-full object-cover bg-black"
                      preload="metadata"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayCircle className="h-8 w-8 text-white/80" />
                    </div>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}