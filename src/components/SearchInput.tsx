import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

function SearchInput({ setSearch }: { setSearch: (search: string) => void }) {
  const debounceRef = useRef<any | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(query);
      debounceRef.current = null;
    }, 400);
  };

  return (
    <div className="flex">
      <div className="relative w-full">
        <input
          type="search"
          id="location-search"
          onChange={(e) => handleSearch(e)}
          className="w-80 block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300"
          placeholder="Search for Title/Name"
          required
        />
        <button
          type="button"
          className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 "
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
