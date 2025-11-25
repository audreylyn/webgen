import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Website } from '../../types';

interface PreviewFaqSectionProps {
  website: Website;
  bgSecondary: string;
  isDark: boolean;
  textMuted: string;
}

export const PreviewFaqSection: React.FC<PreviewFaqSectionProps> = ({
  website,
  bgSecondary,
  isDark,
  textMuted,
}) => {
  const { content, theme } = website;

  return (
    <section id="faq" className={`py-20 ${bgSecondary}`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {content.faq.map(f => (
            <details key={f.id} className={`rounded-lg p-4 group ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              <summary className="flex justify-between items-center cursor-pointer font-medium list-none">
                <span>{f.question}</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className={`mt-3 text-sm leading-relaxed ${textMuted}`}>
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
