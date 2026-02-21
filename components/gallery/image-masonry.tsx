"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Lightbox from './lightbox'

type Image = {
  id: string
  title: string
  description: string | null
  url: string
  thumbnailUrl: string
  width: number
  height: number
}

interface ImageMasonryProps {
  images: Image[]
}

export default function ImageMasonry({ images }: ImageMasonryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const getGridRowSpan = (width: number, height: number): number => {
    const aspectRatio = height / width
    if (aspectRatio > 1.5) return 2 // Portrait
    if (aspectRatio < 0.6) return 1 // Wide panorama
    return 1 // Square or landscape
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
        {images.map((image, index) => {
          const rowSpan = getGridRowSpan(image.width, image.height)

          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative rounded-lg overflow-hidden cursor-pointer group ${
                rowSpan === 2 ? 'row-span-2' : ''
              }`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.thumbnailUrl}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold truncate">{image.title}</p>
                  {image.description && (
                    <p className="text-white/80 text-sm truncate">{image.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
