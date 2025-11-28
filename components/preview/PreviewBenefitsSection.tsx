import React from 'react';
import { 
  Sparkles, Star, Heart, Award, Shield, Zap, Leaf, Clock, Users, CheckCircle, ArrowRight,
  Gift, Trophy, Target, Flame, Coffee, ShoppingBag, Truck, Headphones, Mail, Phone,
  Globe, Lock, Eye, ThumbsUp, Smile, Package, Wrench, Lightbulb, Rocket, TrendingUp
} from 'lucide-react';
import { Website } from '../../types';

interface PreviewBenefitsSectionProps {
  website: Website;
  isDark: boolean;
  textMuted: string;
}

// Helper function to darken a color
const darkenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - percent)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * (1 - percent)));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - percent)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

// Icon mapping for Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Star,
  Heart,
  Award,
  Shield,
  Zap,
  Leaf,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Gift,
  Trophy,
  Target,
  Flame,
  Coffee,
  ShoppingBag,
  Truck,
  Headphones,
  Mail,
  Phone,
  Globe,
  Lock,
  Eye,
  ThumbsUp,
  Smile,
  Package,
  Wrench,
  Lightbulb,
  Rocket,
  TrendingUp,
};

// Helper to check if icon is a URL
const isImageUrl = (icon: string): boolean => {
  return icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('data:');
};

// Helper to render icon
const renderIcon = (icon: string, theme: { primary: string }) => {
  if (!icon) {
    const IconComponent = iconMap['Star'] || Star;
    return <IconComponent className="w-6 h-6" style={{ color: theme.primary }} />;
  }
  
  if (isImageUrl(icon)) {
    return (
      <img 
        src={icon} 
        alt="Benefit icon" 
        className="w-6 h-6 object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'block';
        }}
      />
    );
  }
  
  const IconComponent = iconMap[icon] || Star;
  return <IconComponent className="w-6 h-6" style={{ color: theme.primary }} />;
};

export const PreviewBenefitsSection: React.FC<PreviewBenefitsSectionProps> = ({
  website,
  isDark,
  textMuted,
}) => {
  const { content, theme } = website;

  // Create dynamic gradient colors from theme
  const darkPrimary = darkenColor(theme.primary, 0.2);
  const darkButton = darkenColor(theme.button, 0.15);

  return (
    <section id="benefits" className="py-20">
      <style>{`
        .benefit-card-wrapper {
          position: relative;
          max-width: 300px;
          max-height: 320px;
          border-radius: 10px;
          padding: 2em 1.2em;
          margin: 12px;
          text-decoration: none;
          z-index: 0;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
          width: 100%;
          cursor: pointer;
        }
        .benefit-card-corner {
          position: absolute;
          z-index: -1;
          top: -16px;
          right: -16px;
          height: 32px;
          width: 32px;
          border-radius: 32px;
          transform: scale(1);
          transform-origin: 50% 50%;
          transition: transform 0.35s ease-out;
        }
        .benefit-card-wrapper:hover .benefit-card-corner {
          transform: scale(28);
        }
        .benefit-card-title {
          color: #262626;
          font-size: 1.5em;
          line-height: normal;
          font-weight: 700;
          margin-bottom: 0.5em;
          transition: all 0.5s ease-out;
        }
        .benefit-card-wrapper:hover .benefit-card-title {
          color: #ffffff;
        }
        .benefit-card-desc {
          font-size: 1em;
          font-weight: 400;
          line-height: 1.5em;
          color: #452c2c;
          transition: all 0.5s ease-out;
        }
        .benefit-card-wrapper:hover .benefit-card-desc {
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ 
            backgroundColor: theme.primary + '15',
            border: `1px solid ${theme.primary}30`
          }}>
            <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
            <span className="text-sm font-semibold" style={{ color: theme.primary }}>Benefits</span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>Why Choose Us</h2>
          <p className={`text-lg ${textMuted} max-w-2xl mx-auto`}>
            Discover what makes us the perfect choice for you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {content.benefits.map(b => (
            <div
              key={b.id}
              className="benefit-card-wrapper"
              style={{
                backgroundColor: theme.secondary,
              }}
            >
              {/* Corner element that expands on hover */}
              <div
                className="benefit-card-corner"
                style={{
                  background: `linear-gradient(135deg, ${darkPrimary}, ${darkButton})`,
                }}
              />
              
              {/* Icon at top left */}
              {b.icon && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1.2em',
                    left: '1.2em',
                    zIndex: 1,
                  }}
                >
                  {renderIcon(b.icon, theme)}
                </div>
              )}
              
              {/* Arrow in corner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  width: '2em',
                  height: '2em',
                  overflow: 'hidden',
                  top: 0,
                  right: 0,
                  background: `linear-gradient(135deg, ${theme.primary}, ${darkButton})`,
                  borderRadius: '0 4px 0 32px',
                }}
              >
                <div
                  style={{
                    marginTop: '-4px',
                    marginRight: '-4px',
                    color: 'white',
                    fontFamily: 'courier, sans',
                  }}
                >
                  →
                </div>
              </div>

              {/* Card Title */}
              <p className="benefit-card-title">
                {b.title}
              </p>

              {/* Card Description */}
              <p className="benefit-card-desc">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
