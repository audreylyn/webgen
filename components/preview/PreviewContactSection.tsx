import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Website } from '../../types';

interface PreviewContactSectionProps {
  website: Website;
  isDark: boolean;
}

export const PreviewContactSection: React.FC<PreviewContactSectionProps> = ({
  website,
  isDark,
}) => {
  const { content, theme } = website;

  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: theme.primary }}>Get In Touch</h2>
            <div className="space-y-6">
              {content.contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: theme.secondary }}>
                    <Phone className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <span className="text-lg">{content.contact.phone}</span>
                </div>
              )}
              {content.contact.email && (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: theme.secondary }}>
                    <Mail className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <span className="text-lg">{content.contact.email}</span>
                </div>
              )}
              {content.contact.address && (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: theme.secondary }}>
                    <MapPin className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <span className="text-lg">{content.contact.address}</span>
                </div>
              )}
            </div>
          </div>
          <form className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-slate-900' : 'bg-white'}`} onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea className={`w-full px-4 py-2 rounded-lg border h-32 resize-none ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}></textarea>
              </div>
              <button
                className="w-full py-3 rounded-lg font-bold text-white mt-2"
                style={{ backgroundColor: theme.button }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
