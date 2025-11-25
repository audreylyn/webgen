import React from 'react';
import { Plus, Trash, HelpCircle } from 'lucide-react';
import { Website, FAQ } from '../../types';

interface FaqListProps {
  website: Website;
  addItem: <T extends keyof Website['content']>(section: T, item: Website['content'][T][number]) => void;
  removeItem: <T extends keyof Website['content']>(section: T, id: string) => void;
  updateItem: <T extends keyof Website['content'], K extends keyof Website['content'][T][number]>(section: T, id: string, key: K, value: Website['content'][T][number][K]) => void;
}

export const FaqList: React.FC<FaqListProps> = ({
  website,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-slate-500" /> FAQ
        </h3>
        <button
          onClick={() => addItem<FAQ>('faq', { id: Math.random().toString(), question: 'Question?', answer: 'Answer.' })}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>
      <div className="space-y-3">
        {website.content.faq.map((f) => (
          <div key={f.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 group">
            <div className="flex justify-between items-start">
              <input
                type="text"
                value={f.question}
                onChange={(e) => updateItem<FAQ>('faq', f.id, 'question', e.target.value)}
                className="w-full bg-transparent font-semibold border-b border-transparent focus:border-indigo-400 outline-none mb-1"
                placeholder="Question"
              />
              <button onClick={() => removeItem('faq', f.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <Trash className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={f.answer}
              onChange={(e) => updateItem<FAQ>('faq', f.id, 'answer', e.target.value)}
              className="w-full bg-transparent text-sm text-slate-600 border-transparent focus:border-indigo-400 outline-none resize-none"
              placeholder="Answer"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
