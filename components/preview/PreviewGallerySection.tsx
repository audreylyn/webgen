import React, { useState } from 'react';
import { Website, GalleryItem } from '../../types';
import { X } from 'lucide-react';

interface PreviewGallerySectionProps {
  website: Website;
  bgSecondary: string;
  isDark: boolean;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const PreviewGallerySection: React.FC<PreviewGallerySectionProps> = ({
  website,
  bgSecondary,
  isDark,
  handleImageError,
}) => {
  const { content, theme } = website;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  if (content.gallery.length === 0) {
    return null; // Don't render section if no gallery items
  }

  return (
    <section id="gallery" className={`py-20 ${bgSecondary}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Our Gallery</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {content.gallery.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.caption || 'Gallery image'}
                onError={handleImageError}
                className="w-full h-48 object-cover"
              />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm font-medium">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {lightboxOpen && selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-3xl max-h-full rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors z-10"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.caption || 'Gallery image'}
                className="max-w-full max-h-[80vh] object-contain"
                onError={handleImageError}
              />
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-base text-center">
                  {selectedImage.caption}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
