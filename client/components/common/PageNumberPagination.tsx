"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  maxVisible?: number;
}

export default function PageNumberPagination({
  page,
  totalPages,
  setPage,
  maxVisible = 5,
}: Props) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(page - 2, 1);
      const end = Math.min(start + maxVisible - 1, totalPages);
      if (end - start < maxVisible - 1)
        start = Math.max(end - maxVisible + 1, 1);
      if (start > 1) pages.push(1, "left-ellipsis");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages) pages.push("right-ellipsis", totalPages);
    }
    return pages;
  };

  const btnBase =
    "min-w-[36px] h-9 flex items-center justify-center rounded-md text-sm font-medium border transition-colors";

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-1">
        <button
          className={`${btnBase} border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPages().map((p, i) =>
          typeof p === "string" ? (
            <span key={i} className={`${btnBase} border-transparent`}>
              …
            </span>
          ) : (
            <button
              key={i}
              className={`${btnBase} ${
                p === page
                  ? "bg-[#003366] text-white border-[#003366]"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ),
        )}

        <button
          className={`${btnBase} border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
