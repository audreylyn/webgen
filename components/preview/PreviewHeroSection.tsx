import React from 'react';
import { Website } from '../../types';

interface PreviewHeroSectionProps {
  website: Website;
  textMuted: string;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const PreviewHeroSection: React.FC<PreviewHeroSectionProps> = ({
  website,
  textMuted,
  handleImageError,
}) => {
  const { content, theme } = website;

  return (
    <section id="hero" className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {content.hero.title}
          </h1>
          <p className={`text-lg mb-8 ${textMuted}`}>
            {content.hero.subtext}
          </p>
          <button
            className="px-8 py-3 rounded-lg font-bold text-white shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            style={{ backgroundColor: theme.button }}
          >
            Get Started
          </button>
        </div>
        <div className="lg:w-1/2">
          <img
            src={content.hero.image}
            alt="Hero"
            onError={handleImageError}
            className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 -z-10 opacity-10" style={{ color: theme.secondary }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[600px] h-[600px] fill-current">
          <path d="M42.7,-72.3C55.3,-66.6,65.3,-55.9,74.1,-43.8C82.9,-31.7,90.5,-18.2,91.3,-4.2C92.1,9.8,86.1,24.3,77.2,36.9C68.3,49.5,56.5,60.2,43.2,67.6C29.9,75,15,79.1,0.6,78.1C-13.8,77.1,-27.6,71,-40.1,62.8C-52.6,54.6,-63.8,44.3,-71.4,32.1C-79,19.9,-83,5.8,-79.9,-6.8C-76.8,-19.4,-66.6,-30.5,-56.3,-40.4C-46,-50.3,-35.6,-59,-24.1,-65.7C-12.6,-72.4,0,-77.1,13.2,-78.3C26.4,-79.5,52.8,-77.2,42.7,-72.3Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  );
};
