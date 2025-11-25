import React, { useState } from 'react';
import { Website } from '../../types';
import CartButton from '../CartButton';
import { Menu, X } from 'lucide-react';

interface PreviewNavbarProps {
  website: Website;
  isDark: boolean;
  totalItems: () => number;
  openCart: () => void;
}

export const PreviewNavbar: React.FC<PreviewNavbarProps> = ({
  website,
  isDark,
  totalItems,
  openCart
}) => {
  const { theme, enabledSections } = website;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionMap: { [key in keyof typeof enabledSections]?: string } = {
    hero: 'Home',
    about: 'About',
    products: 'Products',
    benefits: 'Benefits',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    gallery: 'Gallery',
    team: 'Team',
    pricing: 'Pricing',
    callToAction: 'Call to Action',
    contact: 'Contact',
  };

  const excludedSections = ['hero', 'callToAction'];

  const navLinks = Object.entries(enabledSections)
    .filter(([sectionKey, isEnabled]) => isEnabled && !excludedSections.includes(sectionKey))
    .map(([sectionKey]) => {
      const displayKey = sectionKey as keyof typeof enabledSections;
      return {
        id: sectionKey,
        name: sectionMap[displayKey] || sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
        href: `#${sectionKey}`,
      };
    })
    .sort((a, b) => {
      const navLinkOrder = (website.content as any)?.navLinkOrder;
      if (!navLinkOrder) return 0; // No custom order, maintain original order
      const indexA = navLinkOrder.indexOf(a.id as keyof typeof enabledSections);
      const indexB = navLinkOrder.indexOf(b.id as keyof typeof enabledSections);
      return indexA - indexB;
    });

  return (
    <nav className={`${isDark ? 'bg-slate-900/90' : 'bg-white/90'} fixed w-full z-50 backdrop-blur-md border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold" style={{ color: theme.primary }}>
            {website.title}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a key={link.id} href={link.href} className="hover:text-opacity-80 transition-opacity">
                {link.name}
              </a>
            ))}
            {enabledSections.products && (
              <CartButton totalItems={totalItems()} openCart={openCart} themeButton={theme.button} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-slate-600 hover:bg-slate-50 hover:text-slate-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </a>
            ))}
            {enabledSections.products && (
              <div className="pt-2 border-t border-slate-200">
                <CartButton totalItems={totalItems()} openCart={openCart} themeButton={theme.button} />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
