import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-lg border border-slate-300 flex-shrink-0"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
          placeholder="#000000"
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 rounded-lg border border-slate-300 cursor-pointer flex-shrink-0"
        />
      </div>
    </div>
  );
};
