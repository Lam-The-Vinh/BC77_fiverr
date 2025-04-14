"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  autoSearch?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  autoSearch = false,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (autoSearch) {
      onSearch(value);
    }
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center gap-5">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
          value={query}
          onChange={handleChange}
        />
        {!autoSearch && (
          <button
            onClick={handleSearch}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-green-900 text-white rounded-full p-2 hover:bg-green-700 transition"
          >
            <Search size={20} />
          </button>
        )}
      </div>
      {query && (
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-red-600 transition"
          title="Clear search"
        >
          Reset
        </button>
      )}
    </div>
  );
};
