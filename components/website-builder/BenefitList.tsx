import React from 'react';
import { Plus, Trash, Heart, Star } from 'lucide-react';
import { Website, Benefit } from '../../types';

interface BenefitListProps {
  website: Website;
  addItem: <T extends keyof Website['content']>(section: T, item: Website['content'][T][number]) => void;
  removeItem: <T extends keyof Website['content']>(section: T, id: string) => void;
  updateItem: <T extends keyof Website['content'], K extends keyof Website['content'][T][number]>(section: T, id: string, key: K, value: Website['content'][T][number][K]) => void;
}

export const BenefitList: React.FC<BenefitListProps> = ({
  website,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-slate-500" /> Key Benefits
        </h3>
        <button
          onClick={() => addItem<Benefit>('benefits', { id: Math.random().toString(), title: 'New Benefit', description: 'Explanation', icon: 'Star' })}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>
      <div className="space-y-3">
        {website.content.benefits.map((b) => (
          <div key={b.id} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50 group">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center border border-slate-200">
              <Star className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={b.title}
                onChange={(e) => updateItem<Benefit>('benefits', b.id, 'title', e.target.value)}
                className="w-full bg-transparent font-bold border-b border-transparent focus:border-indigo-400 outline-none"
              />
              <input
                type="text"
                value={b.description}
                onChange={(e) => updateItem<Benefit>('benefits', b.id, 'description', e.target.value)}
                className="w-full bg-transparent text-sm text-slate-600 border-transparent focus:border-indigo-400 outline-none mt-1"
              />
            </div>
            <button onClick={() => removeItem('benefits', b.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
