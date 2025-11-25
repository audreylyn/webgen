import React from 'react';
import { Website } from '../../types';

interface PreviewNavbarProps {
  website: Website;
  isDark: boolean;
}

export const PreviewNavbar: React.FC<PreviewNavbarProps> = ({
  website,
  isDark,
}) => {
  const { theme, enabledSections } = website;

  return (
    <nav className={`${isDark ? 'bg-slate-900/90' : 'bg-white/90'} fixed w-full z-50 backdrop-blur-md border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold" style={{ color: theme.primary }}>
            {website.title}
          </div>
          <div className="hidden md:flex space-x-8">
            {enabledSections.hero && <a href="#hero" className="hover:text-opacity-80 transition-opacity">Home</a>}
            {enabledSections.about && <a href="#about" className="hover:text-opacity-80 transition-opacity">About</a>}
            {enabledSections.products && <a href="#products" className="hover:text-opacity-80 transition-opacity">Services</a>}
            {enabledSections.contact && <a href="#contact" className="hover:text-opacity-80 transition-opacity">Contact</a>}
          </div>
        </div>
      </div>
    </nav>
  );
};
