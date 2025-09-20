// src/components/ui/SearchBar.tsx
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm border border-brand-400">
      <Search size={18} className="text-gray-500 mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full focus:outline-none text-gray-700"
      />
    </div>
  );
}
