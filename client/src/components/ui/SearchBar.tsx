// src/components/ui/SearchBar.tsx
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="flex text-sm sm:text-base md:text-normal lg:text-lg items-center border rounded-lg px-2 py-1 md:px-4 md:py-2 bg-white shadow-sm border border-brand-400 focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-500 focus-within:ring-offset-2">
      <Search className="text-gray-500 mr-2 h-4 w-4 md:h-6 md:w-6" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full focus:outline-none text-brand-800 placeholder:text-xs md:placeholder:text-base"
      />
    </div>
  );
}
