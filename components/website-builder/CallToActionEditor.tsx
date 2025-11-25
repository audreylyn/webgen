import React from 'react';
import { Website, CallToAction } from '../../types';
import { ColorPicker } from '../ColorPicker';

interface CallToActionEditorProps {
  website: Website;
  updateContent: <T extends keyof Website['content']>(key: T, value: Website['content'][T]) => void;
}

export const CallToActionEditor: React.FC<CallToActionEditorProps> = ({
  website,
  updateContent,
}) => {
  const cta = website.content.callToAction;

  const handleCtaChange = <K extends keyof CallToAction>(key: K, value: CallToAction[K]) => {
    updateContent('callToAction', { ...cta, [key]: value });
  };

  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Call to Action Strip</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Text</label>
          <textarea
            value={cta.text}
            onChange={(e) => handleCtaChange('text', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 mt-1 text-slate-700 focus:border-indigo-400 outline-none h-24 resize-none"
            placeholder="One sentence call to action"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700">Button Text</label>
            <input
              type="text"
              value={cta.buttonText}
              onChange={(e) => handleCtaChange('buttonText', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 mt-1 text-slate-700 focus:border-indigo-400 outline-none"
              placeholder="Button Text"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700">Button Link</label>
            <input
              type="text"
              value={cta.buttonLink}
              onChange={(e) => handleCtaChange('buttonLink', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 mt-1 text-slate-700 focus:border-indigo-400 outline-none"
              placeholder="#"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700">Background Color</label>
            <ColorPicker color={cta.backgroundColor} setColor={(color) => handleCtaChange('backgroundColor', color)} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700">Text / Button Background Color</label>
            <ColorPicker color={cta.textColor} setColor={(color) => handleCtaChange('textColor', color)} />
          </div>
        </div>
      </div>
    </section>
  );
};
