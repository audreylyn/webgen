import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Website } from '../../types';

interface PreviewCallToActionSectionProps {
  website: Website;
}

export const PreviewCallToActionSection: React.FC<PreviewCallToActionSectionProps> = ({
  website,
}) => {
  const { content, theme } = website;
  const cta = content.callToAction;

  if (!cta || !cta.text || !cta.buttonText || !cta.buttonLink) {
    return null; // Don't render if CTA is not fully configured
  }

  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      <style>{`
        .cta-section {
          position: relative;
          overflow: hidden;
        }
        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, ${cta.backgroundColor}, ${theme.button});
          opacity: 0.95;
        }
        .cta-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          animation: patternMove 20s ease-in-out infinite;
        }
        @keyframes patternMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -20px) scale(1.1); }
        }
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        .cta-button:hover::before {
          left: 100%;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .cta-content {
          position: relative;
          z-index: 10;
        }
        .sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }
        .sparkle:nth-of-type(1) { animation-delay: 0s; }
        .sparkle:nth-of-type(2) { animation-delay: 1s; }
        .sparkle:nth-of-type(3) { animation-delay: 2s; }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.2) rotate(180deg); }
        }
      `}</style>
      <div className="cta-section">
        <div className="cta-background" />
        <div className="cta-pattern" />
        
        {/* Decorative sparkles */}
        <div className="absolute top-[20%] left-[10%]">
          <Sparkles className="w-6 h-6 sparkle" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
        </div>
        <div className="absolute top-[60%] left-[80%]">
          <Sparkles className="w-4 h-4 sparkle" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
        </div>
        <div className="absolute top-[80%] left-[20%]">
          <Sparkles className="w-5 h-5 sparkle" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center cta-content">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: cta.textColor }}
          >
            {cta.text}
          </h2>
          <p 
            className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto"
            style={{ color: cta.textColor }}
          >
            Take the next step and experience the difference
          </p>
          <a
            href={cta.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-lg shadow-2xl"
            style={{ 
              backgroundColor: cta.textColor, 
              color: cta.backgroundColor 
            }}
          >
            <span>{cta.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
