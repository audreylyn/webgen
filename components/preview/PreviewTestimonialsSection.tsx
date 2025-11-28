import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Website } from '../../types';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

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

  return (
    <section id="testimonials" className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <style>{`
        .testimonial-card {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
        }
        .quote-icon {
          position: absolute;
          top: 20px;
          left: 24px;
          opacity: 0.1;
          transition: all 0.3s ease;
        }
        .testimonial-card:hover .quote-icon {
          opacity: 0.15;
          transform: scale(1.1);
        }
        .testimonial-avatar {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover .testimonial-avatar {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: ${theme.primary} !important;
          background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)'};
          width: 44px !important;
          height: 44px !important;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: ${theme.primary};
          color: white !important;
          transform: scale(1.1);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
        }
        .swiper-pagination-bullet {
          background: ${theme.primary} !important;
          opacity: 0.3;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            What People Say
          </h2>
          <p className={`text-lg ${textMuted} max-w-2xl mx-auto`}>
            Hear from our satisfied customers
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          className="testimonials-swiper"
        >
          {content.testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div className={`testimonial-card p-8 rounded-2xl ${isDark ? 'bg-slate-800/90' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-100'} shadow-xl`}>
                <Quote className="quote-icon w-16 h-16" style={{ color: theme.primary }} />
                
                <div className="relative z-10">
                  <p className={`text-base md:text-lg mb-8 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {t.content}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        onError={handleAvatarError}
                        className="testimonial-avatar w-14 h-14 rounded-full object-cover border-2"
                        style={{ borderColor: theme.primary + '40' }}
                      />
                    ) : (
                      <div 
                        className="testimonial-avatar w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-white"
                        style={{ 
                          backgroundColor: theme.primary,
                          boxShadow: `0 4px 15px ${theme.primary}40`
                        }}
                      >
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {t.name}
                      </p>
                      <p className={`text-sm ${textMuted}`}>
                        {t.role}
                      </p>
                    </div>
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
