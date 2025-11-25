import React, { useEffect } from 'react';
import { Website } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './PreviewGallerySection.css'; // Custom styles

interface PreviewGallerySectionProps {
  website: Website;
  isDark: boolean;
}

export const PreviewGallerySection: React.FC<PreviewGallerySectionProps> = ({
  website,
  isDark,
}) => {
  const { content, theme } = website;

  return (
    <section className="base-template" style={{
      backgroundColor: isDark ? theme.primary : '#f9fafb',
      color: isDark ? 'white' : '#1f2937'
    }}>
      <div className="base-template__wrapper wrapper">
        <h1 className="base-template__title" style={{ color: isDark ? 'white' : theme.primary }}>
          Find Your Perfect Home Away From Home
        </h1>
        <div className="base-template__text">
          Explore a wide selection of rental homes designed to suit your lifestyle.
          <br />
          Experience comfort, convenience, and unforgettable moments in beautifully crafted spaces.
        </div>
        <div className="base-template__content">
          <div className="booking-slider">
            {/* Slider Navigation */}
            <div className="booking-slider__nav slider-nav">
              <div title="Newest offers" tabIndex={0} className="slider-nav__item slider-nav__item_prev">
                <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 26L2 14L14 2" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div title="Oldest offers" tabIndex={0} className="slider-nav__item slider-nav__item_next">
                <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 26L14 14L2 2" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {/* Slider Content */}
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1.15}
              spaceBetween={20}
              slidesOffsetBefore={20}
              slidesOffsetAfter={20}
              speed={600}
              observer={true}
              watchOverflow={true}
              watchSlidesProgress={true}
              navigation={{
                nextEl: '.booking-slider__nav .slider-nav__item_next',
                prevEl: '.booking-slider__nav .slider-nav__item_prev',
                disabledClass: 'disabled',
              }}
              pagination={{
                el: '.booking-slider__pagination',
                type: 'bullets',
                bulletClass: 'slider-pagination__item',
                bulletActiveClass: 'active',
                clickable: true,
              }}
              breakpoints={{
                575: {
                  slidesPerView: 1.5,
                },
                992: {
                  slidesPerView: 2,
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                },
                1366: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                },
              }}
              className="booking-slider__slider swiper"
            >
              {content.gallery.map((item) => (
                <SwiperSlide key={item.id} className="booking-slider__slide swiper-slide">
                  <div className="booking-slider__item booking-slider-item">
                    <a title={item.caption || "Gallery Item"} href="/" className="booking-slider-item__image" onClick={(e) => e.preventDefault()}>
                      <img src={item.image} alt={item.caption || "Gallery Item"} />
                    </a>
                    <div className="booking-slider-item__content">
                      <h2 className="booking-slider-item__title">
                        <a title={item.caption || "Gallery Item"} href="/" onClick={(e) => e.preventDefault()}>
                          {item.caption || "Gallery Item"}
                        </a>
                      </h2>
                      <div className="booking-slider-item__text">
                        {item.caption || "Explore this beautifully crafted space."}
                      </div>
                      {/* Add other details if available in GalleryItem type */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Slider Pagination */}
            <div className="booking-slider__pagination slider-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
