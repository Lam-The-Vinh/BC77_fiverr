"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  const delta = 2;
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);
  if (left > 2) {
    pages.push("ellipsis-left");
  }
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }
  if (right < totalPages - 1) {
    pages.push("ellipsis-right");
  }
  pages.push(totalPages);

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination Navigation" className="mt-4">
      <ul className="flex items-center space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Prev
            </button>
          </li>
        )}
        {pages.map((page, idx) =>
          typeof page === "string" ? (
            <li key={idx} className="px-3 py-1">
              <span className="text-gray-500">...</span>
            </li>
          ) : (
            <li key={idx}>
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded border ${
                  page === currentPage
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            </li>
          )
        )}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
