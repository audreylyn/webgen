import React from 'react';
import { Layers } from 'lucide-react';
import { Website } from '../../types';

interface SectionVisibilityProps {
  website: Website;
  setWebsite: React.Dispatch<React.SetStateAction<Website | null>>;
}

export const SectionVisibility: React.FC<SectionVisibilityProps> = ({
  website,
  setWebsite,
}) => {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-indigo-500" />
        Page Sections
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(website.enabledSections) as Array<keyof typeof website.enabledSections>).map((key) => {
          const enabled = website.enabledSections[key];
          return (
            <label key={String(key)} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 transition-all">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setWebsite(prev => prev ? ({ ...prev, enabledSections: { ...prev.enabledSections, [key]: e.target.checked } }) : prev)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="capitalize text-sm font-medium text-slate-700">{key} Section</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
