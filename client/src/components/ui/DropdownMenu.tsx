import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
export type SortOptions = {
  value: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  order?: string | null;
};
type DropdownMenuProps = {
  options: SortOptions[];
  value: string;
  onChange: (value: string) => void;
  order?: string | null;
  onChangeOrder?: ((o: string) => void) | null;
};
function useClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
function DropdownMenu({
  options,
  value,
  onChange,
  order,
  onChangeOrder,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const selectedOptionData = options.find(
    (option) =>
      option.value === value && (option.order ? option.order === order : true)
  );
  function handleChange(newValue: string, newOrder: string) {
    onChange(newValue);
    if (onChangeOrder) {
      onChangeOrder(newOrder);
    }
    setIsOpen(false);
  }
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex px-2 py-1 text-sm md:text-base md:px-4 md:py-2 justify-between items-center border border-2 rounded-md border-brand-100 cursor-pointer focus:outline-none focus:ring-1 focus:border-brand-300 focus:ring-brand-600 focus:ring-offset-2 transition-all duration-200 ${
          isOpen ? "bg-brand-50" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          {selectedOptionData && <selectedOptionData.icon size={15} />}
          <span className="text-xs md:text-base">
            {selectedOptionData?.label}
          </span>
        </div>
        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white border border-2 border-brand-300 rounded-sm  flex flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(option.value, option.order ?? "")}
              className="w-full min-w-[180px] flex items-center gap-3 p-2 hover:bg-brand-100 border-b border-brand-200"
            >
              <option.icon size={20} />
              <div className="flex flex-col text-start">
                <span className="text-sm md:text-base">{option.label}</span>
                <span className="text-[0.625rem]">{option.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
