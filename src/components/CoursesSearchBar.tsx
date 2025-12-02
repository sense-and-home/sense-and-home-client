import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useDebounceValue } from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

export function CoursesSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);
  const debouncedInputValue = useDebounceValue(inputValue, 500);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    onChange(debouncedInputValue);
  }, [onChange, debouncedInputValue]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(inputValue);
      inputRef.current?.blur();
    }
  }

  function handleClick() {
    onChange(inputValue);
    inputRef.current?.blur();
    buttonRef.current?.blur();
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-[#F3F4F6] p-3 sm:flex-row sm:gap-4">
      <div className="flex h-full w-full items-center rounded-lg bg-white px-2 outline-gray-500 transition-colors focus-within:outline-2">
        <label htmlFor="search-input">
          <SearchIcon />
        </label>

        <Input
          type="search"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="ml-2 w-full border-none p-2 shadow-none outline-none"
          id="search-input"
          placeholder="Название курса или навыка..."
        />
      </div>

      <Button
        ref={buttonRef}
        onClick={handleClick}
        className="bg-accent-2 w-full outline-gray-500 focus:outline-2 sm:max-w-36"
      >
        Поиск
      </Button>
    </div>
  );
}
