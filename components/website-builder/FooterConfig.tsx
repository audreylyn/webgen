import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Link as LinkIcon } from 'lucide-react';
import { Website, SocialLink } from '../../types';

interface FooterConfigProps {
  website: Website;
  updateContent: (section: 'footerText', data: string) => void;
  updateSocialLink: (platform: string, key: keyof SocialLink, value: string | boolean) => void;
}

export const FooterConfig: React.FC<FooterConfigProps> = ({
  website,
  updateContent,
  updateSocialLink,
}) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Footer Configuration</h3>
        <p className="text-slate-500 text-sm">Customize your website footer</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">Footer Text</label>
        <textarea
          placeholder="© 2024 All rights reserved."
          value={website.content.footerText}
          onChange={(e) => updateContent('footerText', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg h-24 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Social Media Links</label>
        <div className="space-y-4">
          {website.content.socialLinks.map((link) => (
            <div key={link.platform} className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-slate-500 bg-slate-50 rounded border border-slate-200">
                {getSocialIcon(link.platform)}
              </div>
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateSocialLink(link.platform, 'url', e.target.value)}
                placeholder={`https://${link.platform}.com/yourpage`}
                className={`flex-1 px-4 py-2 border rounded-lg outline-none ${!link.enabled ? 'bg-slate-50 text-slate-400' : 'bg-white border-slate-300 focus:border-indigo-500'}`}
                disabled={!link.enabled}
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={link.enabled}
                  onChange={(e) => updateSocialLink(link.platform, 'enabled', e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
