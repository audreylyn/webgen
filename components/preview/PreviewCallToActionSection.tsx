import React from 'react';
import { Website } from '../../types';

interface PreviewCallToActionSectionProps {
  website: Website;
}

export const PreviewCallToActionSection: React.FC<PreviewCallToActionSectionProps> = ({
  website,
}) => {
  const { content } = website;
  const cta = content.callToAction;

  if (!cta || !cta.text || !cta.buttonText || !cta.buttonLink) {
    return null; // Don't render if CTA is not fully configured
  }

  return (
    <section id="cta" className="py-16">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg p-8 text-center"
        style={{ backgroundColor: cta.backgroundColor, color: cta.textColor }}
      >
        <h2 className="text-3xl font-bold mb-6">{cta.text}</h2>
        <a
          href={cta.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full font-medium text-lg transition-transform hover:scale-105"
          style={{ backgroundColor: cta.textColor, color: cta.backgroundColor }}
        >
          {cta.buttonText}
        </a>
      </div>
    </section>
  );
};
