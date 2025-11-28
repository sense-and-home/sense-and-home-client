import { SearchIcon } from "lucide-react";

export function CoursesSearchbar() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F3F4F6] p-3 sm:flex-row sm:gap-4">
      <div className="flex h-full w-full items-center rounded-lg bg-white px-2 outline-gray-500 transition-colors focus-within:outline-2">
        <label htmlFor="search-input">
          <SearchIcon />
        </label>

        <input
          id="search-input"
          className="ml-2 w-full border-none p-2 shadow-none outline-none"
          type="search"
          placeholder="Название курса или навыка..."
        />
      </div>

      <button className="bg-accent-2 h-full w-full rounded-lg py-2 font-bold outline-gray-500 hover:cursor-pointer focus:outline-2 sm:w-36">
        Поиск
      </button>
    </div>
  );
}
