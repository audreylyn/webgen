import React from 'react';
import { Plus, Trash } from 'lucide-react';
import { Website, PricingPlan } from '../../types';

interface PricingListProps {
  website: Website;
  addItem: <T extends keyof Website['content']>(section: T, item: Website['content'][T][number]) => void;
  removeItem: <T extends keyof Website['content']>(section: T, id: string) => void;
  updateItem: <T extends keyof Website['content'], K extends keyof Website['content'][T][number]>(section: T, id: string, key: K, value: Website['content'][T][number][K]) => void;
}

export const PricingList: React.FC<PricingListProps> = ({
  website,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Pricing Table</h3>
        <button
          onClick={() => addItem<PricingPlan>('pricing', { id: Math.random().toString(), name: 'New Plan', price: '₱0.00', features: ['Feature 1', 'Feature 2'], buttonText: 'Sign Up', buttonLink: '#' })}
          className="text-sm flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <Plus className="w-4 h-4" /> Add Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {website.content.pricing.map((plan) => (
          <div key={plan.id} className="border border-slate-200 p-4 rounded-lg relative bg-slate-50 group">
            <button onClick={() => removeItem('pricing', plan.id)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash className="w-4 h-4" />
            </button>
            <div className="mb-2">
              <input
                type="text"
                value={plan.name}
                placeholder="Plan Name"
                onChange={(e) => updateItem<PricingPlan>('pricing', plan.id, 'name', e.target.value)}
                className="flex-1 bg-transparent font-bold border-b border-transparent focus:border-indigo-400 outline-none w-full"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={plan.price}
                placeholder="Price"
                onChange={(e) => updateItem<PricingPlan>('pricing', plan.id, 'price', e.target.value)}
                className="flex-1 bg-transparent text-sm border-b border-transparent focus:border-indigo-400 outline-none w-full"
              />
            </div>
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-slate-600 mb-1">Features:</h4>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...plan.features];
                      newFeatures[index] = e.target.value;
                      updateItem<PricingPlan>('pricing', plan.id, 'features', newFeatures);
                    }}
                    className="flex-1 bg-transparent text-xs border-b border-transparent focus:border-indigo-400 outline-none"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newFeatures = plan.features.filter((_, i) => i !== index);
                      updateItem<PricingPlan>('pricing', plan.id, 'features', newFeatures);
                    }}
                    className="text-slate-400 hover:text-red-500 text-xs"
                  >
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateItem<PricingPlan>('pricing', plan.id, 'features', [...plan.features, ''])}
                className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-2"
              >
                <Plus className="w-3 h-3" /> Add Feature
              </button>
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={plan.buttonText}
                placeholder="Button Text"
                onChange={(e) => updateItem<PricingPlan>('pricing', plan.id, 'buttonText', e.target.value)}
                className="flex-1 bg-transparent text-sm border-b border-transparent focus:border-indigo-400 outline-none w-full"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={plan.buttonLink}
                placeholder="Button Link"
                onChange={(e) => updateItem<PricingPlan>('pricing', plan.id, 'buttonLink', e.target.value)}
                className="flex-1 bg-transparent text-sm border-b border-transparent focus:border-indigo-400 outline-none w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
