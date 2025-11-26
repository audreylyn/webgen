import React from 'react';
import { Website } from '../../types';
import { HeroDefault } from './hero-sections/HeroDefault';
import { HeroCentered } from './hero-sections/HeroCentered';
import { HeroImageLeft } from './hero-sections/HeroImageLeft';

import './hero-sections/HeroSections.css'; // Import new CSS file

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
  const { content } = website;

  // Render different hero sections based on content.hero.heroType
  switch (content.hero.heroType) {
    case 'default':
      return (
        <HeroDefault
          website={website}
          textMuted={textMuted}
          handleImageError={handleImageError}
        />
      );
    case 'centered':
      return (
        <HeroCentered
          website={website}
          textMuted={textMuted}
          handleImageError={handleImageError}
        />
      );
    case 'imageLeft':
      return (
        <HeroImageLeft
          website={website}
          textMuted={textMuted}
          handleImageError={handleImageError}
        />
      );
    default:
      return (
        <HeroDefault
          website={website}
          textMuted={textMuted}
          handleImageError={handleImageError}
        />
      );
  }
};
