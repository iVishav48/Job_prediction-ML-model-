'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedImage from './AnimatedImage'

interface Image {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

interface ImageGalleryProps {
  images: Image[]
  className?: string
  showLightbox?: boolean
}

export default function ImageGallery({ 
  images, 
  className = '', 
  showLightbox = true 
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  const openLightbox = (image: Image) => {
    if (showLightbox) {
      setSelectedImage(image)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: [0.2, 0.9, 0.2, 1]
            }}
            className="group cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <div className="relative overflow-hidden rounded-xl border border-electric/40 bg-charcoal/60 backdrop-blur-sm">
              <AnimatedImage
                src={image.src}
                alt={image.alt}
                className="h-64 w-full"
                containerClassName="h-64"
                animationType="scaleIn"
                delay={index * 0.1}
              />
              
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h3
                    className="text-lg font-semibold text-offwhite mb-1"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {image.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-steel"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {image.description}
                  </motion.p>
                </div>
              </motion.div>
              
              {/* Zoom indicator */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="w-4 h-4 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
              />
              
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.2 }}
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-electric/20 hover:bg-electric/30 rounded-full flex items-center justify-center text-electric transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              {/* Image info */}
              {(selectedImage.title || selectedImage.description) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 bg-charcoal/90 backdrop-blur-sm rounded-lg p-4"
                >
                  {selectedImage.title && (
                    <h3 className="text-xl font-semibold text-offwhite mb-2">
                      {selectedImage.title}
                    </h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-steel">
                      {selectedImage.description}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
