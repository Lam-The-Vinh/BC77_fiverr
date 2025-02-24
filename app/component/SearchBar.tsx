"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  autoSearch?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
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

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
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
  );
};
