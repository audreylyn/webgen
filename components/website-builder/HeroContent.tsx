import React, { useRef } from 'react';
import { ImageIcon, Upload, Loader2 } from 'lucide-react';
import { Website, HeroContent as HeroContentType } from '../../types';

interface HeroContentProps {
  website: Website;
  updateContent: (section: 'hero', data: HeroContentType) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
  isUploadingImage: boolean; // New prop
}

export const HeroContent: React.FC<HeroContentProps> = ({
  website,
  updateContent,
  handleFileUpload,
  isUploadingImage, // Destructure new prop
}) => {
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-slate-500" /> Hero Section
      </h3>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Headline"
          value={website.content.hero.title}
          onChange={(e) => website && updateContent('hero', { ...website.content.hero, title: e.target.value })}
          className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-lg"
        />
        <textarea
          placeholder="Subtext"
          value={website.content.hero.subtext}
          onChange={(e) => website && updateContent('hero', { ...website.content.hero, subtext: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg h-24 resize-none"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Banner Image URL"
            value={website.content.hero.image}
            onChange={(e) => website && updateContent('hero', { ...website.content.hero, image: e.target.value })}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-500"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={heroImageInputRef}
            onChange={(e) => handleFileUpload(e, (base64) => website && updateContent('hero', { ...website.content.hero, image: base64 }))}
          />
          <button
            onClick={() => heroImageInputRef.current?.click()}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Upload Image"
            disabled={isUploadingImage}
          >
            {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
};
