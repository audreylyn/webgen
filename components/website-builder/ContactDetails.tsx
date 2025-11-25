import React from 'react';
import { Website, ContactContent } from '../../types';

interface ContactDetailsProps {
  website: Website;
  updateContent: (section: 'contact', data: ContactContent) => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  website,
  updateContent,
}) => {
  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Contact Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Phone Number"
          value={website.content.contact.phone}
          onChange={(e) => website && updateContent('contact', { ...website.content.contact, phone: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={website.content.contact.email}
          onChange={(e) => website && updateContent('contact', { ...website.content.contact, email: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Address"
          value={website.content.contact.address}
          onChange={(e) => website && updateContent('contact', { ...website.content.contact, address: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
      </div>
    </section>
  );
};
