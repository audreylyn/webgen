import React from 'react';
import { Website, PricingPlan } from '../../types';
import { Check } from 'lucide-react';

interface PreviewPricingSectionProps {
  website: Website;
  bgSecondary: string;
  isDark: boolean;
}

export const PreviewPricingSection: React.FC<PreviewPricingSectionProps> = ({
  website,
  bgSecondary,
  isDark,
}) => {
  const { content, theme } = website;

  if (content.pricing.length === 0) {
    return null; // Don't render section if no pricing plans
  }

  return (
    <section id="pricing" className={`py-20 ${bgSecondary}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Our Pricing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.pricing.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl overflow-hidden shadow-lg p-8 flex flex-col ${isDark ? 'bg-slate-800' : 'bg-white'}`}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>{plan.name}</h3>
              <p className="text-4xl font-extrabold mb-6" style={{ color: theme.primary }}>{plan.price}</p>
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded text-white font-medium text-lg transition-opacity hover:opacity-90 flex items-center justify-center"
                style={{ backgroundColor: theme.button }}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
