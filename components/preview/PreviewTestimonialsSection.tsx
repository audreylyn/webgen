import React from 'react';
import { User } from 'lucide-react';
import { Website } from '../../types';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './PreviewTestimonialsSection.css';

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
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>What People Say</h2>
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
          className="mySwiper"
        >
          {content.testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div className={`p-8 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} relative border border-slate-200 shadow-md`}>
                <div className="text-5xl absolute top-4 left-6 opacity-10" style={{ color: theme.primary }}>"</div>
                <p className={`text-lg mb-6 relative z-10 text-slate-600`}>{t.content}</p>
                <div className="flex items-center gap-4">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      onError={handleAvatarError}
                      className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200"
                    />
                  ) : (
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xl ring-2 ring-indigo-300`}>
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-slate-800 text-lg">{t.name}</p>
                    <p className={`text-sm text-slate-500`}>{t.role}</p>
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
