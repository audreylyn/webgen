import React from 'react';
import { Website } from '../../../types';

interface HeroCenteredProps {
  website: Website;
  textMuted: string;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const HeroCentered: React.FC<HeroCenteredProps> = ({
  website,
  textMuted,
  handleImageError,
}) => {
  const { content, theme } = website;

  return (
    <section id="hero" className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden text-center hero-centered">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          {content.hero.title}
        </h1>
        <p className={`text-lg mb-8 ${textMuted}`}>
          {content.hero.subtext}
        </p>
        {content.hero.buttonLink && (
          <a
            href={content.hero.buttonLink}
            className="px-8 py-3 rounded-lg font-bold text-white shadow-lg transform hover:-translate-y-1 transition-all duration-200 inline-block"
            style={{ backgroundColor: theme.button }}
          >
            Get Started
          </a>
        )}
        <div className="w-full max-w-2xl mt-8">
          <img
            src={content.hero.image}
            alt="Hero"
            onError={handleImageError}
            className="rounded-2xl shadow-2xl object-cover w-full h-[300px] lg:h-[400px]"
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <svg
          className="w-full h-full text-gray-200"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 100,100 0,100" />
        </svg>
      </div>
    </section>
  );
};
