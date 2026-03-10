import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PageNumberPagination = ({ page, totalPages, setPage, maxVisible = 5 }) => {
  
  // Function to generate page numbers with ellipsis
  const getPaginationNumbers = (current, total, maxVisible) => {
    const pages = [];
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(current - 2, 1);
      let end = Math.min(start + maxVisible - 1, total);

      if (end - start < maxVisible - 1) start = Math.max(end - maxVisible + 1, 1);

      if (start > 1) pages.push(1, "left-ellipsis");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total) pages.push("right-ellipsis", total);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        {/* Previous button */}
        <PaginationItem disabled={page === 1}>
          <PaginationLink previous onClick={() => setPage(page - 1)} />
        </PaginationItem>

        {/* Page numbers */}
        {getPaginationNumbers(page, totalPages, maxVisible).map((p, idx) => {
          if (p === "left-ellipsis" || p === "right-ellipsis") {
            return (
              <PaginationItem key={idx} disabled>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            );
          }
          return (
            <PaginationItem active={p === page} key={idx}>
              <PaginationLink onClick={() => setPage(p)}>{p}</PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next button */}
        <PaginationItem disabled={page === totalPages}>
          <PaginationLink next onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PageNumberPagination;
