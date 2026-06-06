import React from "react";

export interface Column<T extends object> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[] | null | undefined;
  isLoading?: boolean;
  emptyMessage?: string;
  keyExtractor?: (row: T, index: number) => string | number;
}

function Table<T extends object>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No records found.",
  keyExtractor,
}: TableProps<T>) {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="w-full overflow-hidden rounded-lg border border-stone-200 shadow-sm shadow-stone-950/5 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className={`px-4 py-3 font-semibold text-stone-600 uppercase tracking-wide text-xs whitespace-nowrap ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-stone-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-stone-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : safeData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-stone-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              safeData.map((row, rowIndex) => (
                <tr
                  key={keyExtractor ? keyExtractor(row, rowIndex) : rowIndex}
                  className="hover:bg-stone-50 transition-colors duration-100"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.accessor)}
                      className={`px-4 py-3 text-stone-700 ${col.className ?? ""}`}
                    >
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : String(row[col.accessor] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
