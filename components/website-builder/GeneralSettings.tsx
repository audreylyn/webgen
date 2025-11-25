import React from 'react';
import { Website } from '../../types';

interface GeneralSettingsProps {
  website: Website;
  setWebsite: React.Dispatch<React.SetStateAction<Website | null>>;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  website,
  setWebsite,
}) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 border-b pb-2">General Information</h3>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Website Title</label>
        <input
          type="text"
          value={website.title}
          onChange={(e) => setWebsite({ ...website, title: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Subdomain</label>
        <div className="flex">
          <input
            type="text"
            value={website.subdomain}
            onChange={(e) => setWebsite({ ...website, subdomain: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <span className="bg-slate-100 border border-l-0 border-slate-300 text-slate-500 px-4 py-2 rounded-r-lg">
            .likhasiteworks.dev
          </span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
          value={website.status || 'draft'}
          onChange={(e) => setWebsite({ ...website, status: e.target.value as 'draft' | 'published' })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
    </div>
  );
};
