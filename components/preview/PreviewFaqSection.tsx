import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Website } from '../../types';

interface PreviewFaqSectionProps {
  website: Website;
  isDark: boolean;
}

export const PreviewFaqSection: React.FC<PreviewFaqSectionProps> = ({
  website,
  isDark,
}) => {
  const { content, theme } = website;
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  if (content.faq.length === 0) {
    return null; // Don't render section if no FAQ items
  }

  return (
    <section id="faq" className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <style>{`
        .faq-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-item:hover {
          transform: translateX(5px);
        }
        .faq-button {
          transition: all 0.3s ease;
        }
        .faq-button:hover {
          background: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
        }
        .faq-icon {
          transition: all 0.3s ease;
        }
        .faq-item[aria-expanded="true"] .faq-icon {
          transform: rotate(180deg);
          background: ${theme.primary};
          color: white;
        }
        .faq-content {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: theme.primary + '20' }}>
            <HelpCircle className="w-8 h-8" style={{ color: theme.primary }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            Frequently Asked Questions
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
            Find answers to common questions about our services
          </p>
        </div>
        
        <div className="space-y-4">
          {content.faq.map((f) => {
            const isExpanded = expandedItem === f.id;
            return (
              <div
                key={f.id}
                className={`faq-item rounded-xl overflow-hidden border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'} shadow-lg`}
                aria-expanded={isExpanded}
              >
                <button
                  className="faq-button w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl"
                  style={{ 
                    focusRingColor: theme.primary,
                  }}
                  onClick={() => toggleAccordion(f.id)}
                  aria-expanded={isExpanded}
                >
                  <span className={`flex-1 font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {f.question}
                  </span>
                  <div
                    className="faq-icon flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      borderColor: isExpanded ? theme.primary : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'),
                      backgroundColor: isExpanded ? theme.primary : 'transparent',
                    }}
                  >
                    {isExpanded ? (
                      <Minus className="w-4 h-4" style={{ color: 'white' }} />
                    ) : (
                      <Plus className="w-4 h-4" style={{ color: theme.primary }} />
                    )}
                  </div>
                </button>
                
                <div
                  className="faq-content overflow-hidden"
                  style={{
                    maxHeight: isExpanded ? '500px' : '0',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5">
                    <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
