import React, { useState } from 'react';
import { Website } from '../../types';
import { MapPin, Mail, Phone } from 'lucide-react'; // Using Lucide React icons
// import './PreviewContactSection.css'; // Removed as no longer needed

interface PreviewContactSectionProps {
  website: Website;
  isDark: boolean;
}

export const PreviewContactSection: React.FC<PreviewContactSectionProps> = ({
  website,
  isDark,
}) => {
  const { content, theme } = website;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you would typically send the data to a backend
    alert('Message sent! (Check console for data)');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900" style={{
      backgroundColor: isDark ? theme.primary : '#ffffff',
      color: isDark ? 'white' : '#1f2937'
    }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Contact Information */}
        <div className="lg:order-2 space-y-8 text-center lg:text-left">
          <h2 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
            Get in <span style={{ color: theme.secondary }}>Touch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            We'd love to hear from you! Send us a message or connect with us using the details below.
          </p>
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <Phone className="flex-shrink-0" size={28} style={{ color: theme.secondary }} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{content.contact.phone || 'N/A'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <Mail className="flex-shrink-0" size={28} style={{ color: theme.secondary }} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-gray-700 dark:text-gray-300 break-words text-lg">{content.contact.email || 'N/A'}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <MapPin className="flex-shrink-0" size={28} style={{ color: theme.secondary }} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Location</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{content.contact.address || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:order-1 bg-gray-50 dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Send us a Message
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <textarea
              id="message"
              name="message"
              placeholder="Write Your Message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            ></textarea>
            <button
              type="submit"
              className="px-8 py-4 rounded-lg text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: theme.secondary }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
