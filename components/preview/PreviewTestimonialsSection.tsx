import React, { useRef, useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Website } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

interface PreviewTestimonialsSectionProps {
  website: Website;
  isDark: boolean;
  textMuted: string;
  handleAvatarError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const PreviewTestimonialsSection: React.FC<PreviewTestimonialsSectionProps> = ({
  website,
  isDark,
  textMuted,
  handleAvatarError,
}) => {
  const { content, theme } = website;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (swiper) {
      const updateButtons = () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      };
      updateButtons();
      swiper.on('slideChange', updateButtons);
      return () => {
        swiper.off('slideChange', updateButtons);
      };
    }
  }, [swiper]);

  if (content.testimonials.length === 0) {
    return null;
  }

  // Get warm brown colors from theme
  const warmBrown = theme.colors?.brand600 || theme.primary;
  const darkBrown = theme.colors?.brand900 || '#67392b';
  const lightCream = theme.colors?.brand50 || theme.secondary || '#fbf8f3';
  const bgColor = theme.primary; // Dark brown background

  return (
    <section id="testimonials" className="py-20 relative" style={{ backgroundColor: bgColor }}>
      <style>{`
        :root {
          --tw-ring-color: transparent !important;
        }
        * {
          --tw-ring-color: transparent !important;
        }
        .testimonial-card {
          background-color: ${lightCream};
          border-radius: 16px;
          padding: 32px;
          height: 100%;
          position: relative;
          transition: transform 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
        }
        .quote-mark-large {
          position: absolute;
          top: 16px;
          right: 24px;
          font-size: 96px;
          line-height: 1;
          opacity: 0.2;
          color: ${lightCream};
          font-family: serif;
          font-weight: 300;
        }
        .quote-mark-small {
          position: absolute;
          bottom: -4px;
          left: -4px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: ${lightCream};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: ${warmBrown};
          font-family: serif;
          font-weight: 300;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
        .swiper-button-custom {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: transparent;
          border: 2px solid ${warmBrown};
          color: ${warmBrown};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-button-custom:hover {
          background-color: ${warmBrown};
          color: white;
        }
        .swiper-button-custom:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .swiper-button-custom:disabled:hover {
          background-color: transparent;
          color: ${warmBrown};
        }
        .swiper-button-custom svg {
          width: 20px;
          height: 20px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p 
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: warmBrown }}
            >
              COMMUNITY LOVE
            </p>
            <h2 
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ 
                color: 'white',
                fontFamily: 'serif'
              }}
            >
              Words from our{' '}
              <span 
                style={{ 
                  fontFamily: 'cursive, serif',
                  fontStyle: 'italic'
                }}
              >
                Regulars
              </span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              ref={navigationPrevRef}
              className="swiper-button-custom swiper-button-prev-custom"
              aria-label="Previous"
              onClick={() => swiper?.slidePrev()}
              disabled={isBeginning}
            >
              <ChevronLeft />
            </button>
            <button
              ref={navigationNextRef}
              className="swiper-button-custom swiper-button-next-custom"
              aria-label="Next"
              onClick={() => swiper?.slideNext()}
              disabled={isEnd}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSwiper={setSwiper}
          className="testimonials-swiper"
        >
          {content.testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card">
                {/* Large decorative quote mark */}
                <div className="quote-mark-large">"</div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: warmBrown }}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p 
                  className="text-base md:text-lg mb-8 leading-relaxed pr-8"
                  style={{ color: darkBrown }}
                >
                  {t.content}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        onError={handleAvatarError}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white"
                        style={{ backgroundColor: warmBrown }}
                      >
                        {t.name.charAt(0)}
                      </div>
                    )}
                    {/* Small closing quote icon on avatar */}
                    <div className="quote-mark-small">"</div>
                  </div>
                  <div>
                    <p 
                      className="font-bold text-base mb-1"
                      style={{ color: darkBrown }}
                    >
                      {t.name}
                    </p>
                    <p 
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: warmBrown }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
