import React from 'react';
import { Website } from '../../../types';
import { ChevronDown } from 'lucide-react';

interface HeroPremiumProps {
  website: Website;
  textMuted: string;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const HeroPremium: React.FC<HeroPremiumProps> = ({
  website,
  textMuted,
  handleImageError,
}) => {
  const { content, theme } = website;

  // Get theme colors
  const darkBrown = theme.colors?.brand900 || '#67392b';
  const warmBrown = theme.colors?.brand500 || '#c58550';
  const brand600 = theme.colors?.brand600 || theme.primary || '#b96b40';
  const brand50 = theme.colors?.brand50 || theme.secondary || '#fbf8f3';

  // Parse title to split "Rise &" and "Shine" or use full title
  const titleParts = content.hero.title.includes('&') 
    ? content.hero.title.split('&')
    : [content.hero.title];
  const titleFirst = titleParts[0]?.trim() || content.hero.title;
  const titleSecond = titleParts[1]?.trim() || '';

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ken-burns-bg {
          animation: kenBurns 20s ease-in-out infinite;
        }
        .pulse-dot {
          animation: pulse 2s ease-in-out infinite;
        }
        .fade-in-up-1 {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        .fade-in-up-2 {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        .fade-in-up-3 {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }
        .fade-in-up-4 {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
      `}</style>

      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.image}
          alt="Hero Background"
          onError={handleImageError}
          className="ken-burns-bg w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Gradient overlay with brand color tint */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 mix-blend-multiply"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, ${darkBrown}80 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Status Badge */}
        <div className="fade-in-up-1 mb-8">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20"
            style={{ fontFamily: 'var(--body-font)' }}
          >
            <span className="relative flex h-2 w-2">
              <span 
                className="pulse-dot absolute inline-flex h-full w-full rounded-full"
                style={{ backgroundColor: '#10b981' }}
              />
              <span 
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: '#10b981', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
              />
            </span>
            <span className="text-white text-sm font-medium">
              {content.hero.statusText || 'OPEN TODAY | 7:00 AM - 4:00 PM'}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div className="fade-in-up-2 mb-6">
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-2"
            style={{ 
              fontFamily: 'var(--heading-font)',
              color: 'white'
            }}
          >
            {titleFirst}
            {titleParts.length > 1 && (
              <>
                {' & '}
                <span 
                  className="italic"
                  style={{ color: warmBrown }}
                >
                  {titleSecond}
                </span>
              </>
            )}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="fade-in-up-3 mb-10">
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ 
              color: 'white',
              fontFamily: 'var(--body-font)'
            }}
          >
            {content.hero.subtext}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-in-up-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <a
            href={content.hero.buttonLink || '#products'}
            className="px-8 py-4 rounded-lg font-semibold text-base md:text-lg text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            style={{ 
              backgroundColor: brand600,
              fontFamily: 'var(--body-font)'
            }}
          >
            {content.hero.primaryButtonText || 'Order for Pickup'}
          </a>

          {/* Secondary Button (Glass-like) */}
          <a
            href={content.hero.secondaryButtonLink || '#about'}
            className="px-8 py-4 rounded-lg font-semibold text-base md:text-lg text-white backdrop-blur-md bg-white/10 border-2 border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            style={{ fontFamily: 'var(--body-font)' }}
          >
            {content.hero.secondaryButtonText || 'Our Story'}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 fade-in-up-4">
        <ChevronDown 
          className="w-6 h-6 text-white animate-bounce"
          style={{ animation: 'bounce 2s infinite' }}
        />
      </div>
    </section>
  );
};

