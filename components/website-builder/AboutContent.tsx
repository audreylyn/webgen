import React from 'react';
import { Website } from '../../types';

interface AboutContentProps {
  website: Website;
  updateContent: (section: 'about', data: string) => void;
}

export const AboutContent: React.FC<AboutContentProps> = ({
  website,
  updateContent,
}) => {
  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 mb-4">About Section</h3>
      <textarea
        placeholder="Tell us about your business..."
        value={website.content.about}
        onChange={(e) => updateContent('about', e.target.value)}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg h-32"
      />
    </section>
  );
};
