"use client";

import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
};

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function Table<T>({ data, columns, className }: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellContent =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as unknown as React.ReactNode);
                return (
                  <td
                    key={colIndex}
                    className="px-4 py-2 whitespace-normal text-sm break-words"
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
