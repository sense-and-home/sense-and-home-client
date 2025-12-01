import { getCourses } from "@/api/courseApi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useDebounceValue } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

export function CoursesSearchbar() {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounceValue(inputValue, 1000);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { refetch } = useQuery({
    queryKey: ["courses", debouncedInputValue],
    queryFn: () => getCourses({ search: debouncedInputValue }),
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    console.log(inputValue);
  }

  function handleSearch() {
    refetch();
    inputRef?.current?.blur();
    buttonRef?.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
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
          className="ml-2 w-full border-none p-2 shadow-none outline-none"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          id="search-input"
          placeholder="Название курса или навыка..."
        />
      </div>

      <Button
        ref={buttonRef}
        onClick={handleSearch}
        className="bg-accent-2 w-full outline-gray-500 focus:outline-2 sm:max-w-36"
      >
        Поиск
      </Button>
    </div>
  );
}
