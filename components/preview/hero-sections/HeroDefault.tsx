import React from 'react';
import { Website } from '../../../types';

interface HeroDefaultProps {
  website: Website;
  textMuted: string;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const HeroDefault: React.FC<HeroDefaultProps> = ({
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
          {content.hero.buttonLink && (
            <a
              href={content.hero.buttonLink}
              className="px-8 py-3 rounded-lg font-bold text-white shadow-lg transform hover:-translate-y-1 transition-all duration-200 inline-block"
              style={{ backgroundColor: theme.button }}
            >
              Get Started
            </a>
          )}
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
