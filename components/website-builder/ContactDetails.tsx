import React from 'react';
import { WebsiteContent, ThemeConfig } from '../../types';
import { useWebsite } from '../../hooks/useWebsite';

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" {...props}>
    {children}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
    {...props}
  />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => (
  <textarea
    className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
    {...props}
  />
);

interface ContactDetailsProps {
  content: WebsiteContent['contact'];
  onContentChange: (newContent: WebsiteContent['contact']) => void;
  isDark: boolean;
  theme: ThemeConfig;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  content,
  onContentChange,
  isDark,
  theme,
}) => {

  return (
    <section className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              value={content.phone}
              onChange={(e) => onContentChange({ ...content, phone: e.target.value })}
              className={
                `mt-1 ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-gray-100 border-gray-300'}`
              }
            />
          </div>
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              value={content.email}
              onChange={(e) => onContentChange({ ...content, email: e.target.value })}
              className={
                `mt-1 ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-gray-100 border-gray-300'}`
              }
            />
          </div>
          <div>
            <Label htmlFor="contact-address">Address</Label>
            <Textarea
              id="contact-address"
              value={content.address}
              onChange={(e) => onContentChange({ ...content, address: e.target.value })}
              rows={3}
              className={
                `mt-1 ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-gray-100 border-gray-300'}`
              }
            />
          </div>
        </div>
        {/* Removed Google Maps Embed URL input */}
      </div>
    </section>
  );
};
