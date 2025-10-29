import { type KeyboardEvent, useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  className = "w-full",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const idx = value
        ? options.findIndex((o) => o.value === value.value)
        : -1;
      setHighlightedIndex(idx >= 0 ? idx : 0);
      setTimeout(() => listRef.current?.focus(), 0);
    }
  }, [isOpen, value, options]);

  const toggleOpen = () => setIsOpen((s) => !s);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      else if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        handleSelect(options[highlightedIndex]);
      }
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={toggleOpen}
        className={`flex w-full cursor-pointer items-center justify-between rounded-[25px] border bg-white px-4 py-3 shadow-sm transition-colors duration-150 select-none ${isOpen ? "rounded-b-none" : ""}`}
      >
        <div className="flex items-center gap-3 truncate">
          <div className="truncate text-sm font-semibold text-black md:text-base">
            {value ? (
              value.label
            ) : (
              <span className="text-black/500">{placeholder}</span>
            )}
          </div>
        </div>

        <span
          aria-hidden
          className={`ml-3 flex-shrink-0 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={
            highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined
          }
          className="custom-select-scrollbar absolute z-50 -mt-px max-h-60 w-full overflow-y-auto rounded-b-[25px] border border-gray-200 bg-white text-black shadow-lg focus:outline-none"
        >
          {options.map((option, idx) => {
            const selected = value ? value.value === option.value : false;
            const highlighted = idx === highlightedIndex;
            return (
              <li
                id={`option-${idx}`}
                key={option.value}
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(option)}
                className={`flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors duration-100 md:text-base ${selected ? "font-semibold" : "font-normal"} ${highlighted ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                <span className="truncate">{option.label}</span>
                {selected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
