import styles from "./styles.module.scss";

const PageNumberPagination = ({ page, totalPages, setPage, maxVisible = 5 }) => {
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
    <div className={styles.paginationWrapper}>
      <ul className={styles.pagination}>
        {/* Prev */}
        <li className={`${styles.pageItem} ${page === 1 ? styles.disabled : ""}`}>
          <button onClick={() => page > 1 && setPage(page - 1)}>‹</button>
        </li>

        {getPaginationNumbers(page, totalPages, maxVisible).map((p, idx) => {
          if (p === "left-ellipsis" || p === "right-ellipsis") {
            return (
              <li key={idx} className={`${styles.pageItem} ${styles.disabled}`}>
                <button>...</button>
              </li>
            );
          }
          return (
            <li
              key={idx}
              className={`${styles.pageItem} ${p === page ? styles.active : ""}`}
            >
              <button onClick={() => setPage(p)}>{p}</button>
            </li>
          );
        })}

        {/* Next */}
        <li
          className={`${styles.pageItem} ${
            page === totalPages ? styles.disabled : ""
          }`}
        >
          <button onClick={() => page < totalPages && setPage(page + 1)}>›</button>
        </li>
      </ul>
    </div>
  );
};

export default PageNumberPagination;
