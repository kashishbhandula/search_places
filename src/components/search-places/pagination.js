export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  loader,
}) {
  const pageChangeHandler = (pageNo) => {
    if (loader) return;
    setCurrentPage(pageNo);
  };
  const pageBlock = (index) => (
    <div
      key={index}
      style={{ background: currentPage === index ? "grey" : "" }}
      onClick={() => pageChangeHandler(index)}
      className="page_block"
    >
      {index}
    </div>
  );
  const nextPageHandler = () => (
    <div
      onClick={() => pageChangeHandler(Math.min(currentPage + 1, totalPages))}
      className="page_block"
    >
      {">"}
    </div>
  );
  const previousPageHandler = () => (
    <div
      onClick={() => pageChangeHandler(Math.max(1, currentPage - 1))}
      className="page_block"
    >
      {"<"}
    </div>
  );
  const getVisiblePages = () => {
    const visiblePages = [];
    const totalPagesToShow = 5;
    const maxPagesToLeftOrRight = Math.floor((totalPagesToShow - 3) / 2);

    let startPage = Math.max(1, currentPage - maxPagesToLeftOrRight);
    let endPage = Math.min(totalPages, startPage + totalPagesToShow - 3);

    if (endPage - startPage < totalPagesToShow - 3) {
      startPage = Math.max(1, endPage - totalPagesToShow + 3);
    }

    if (startPage > 1) {
      visiblePages.push(pageBlock(1));
      if (startPage > 2) {
        visiblePages.push(
          <div key="start_ellipsis" className="page_block">
            ...
          </div>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(pageBlock(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        visiblePages.push(
          <div key="end_ellipsis" className="page_block">
            ...
          </div>
        );
      }
      visiblePages.push(pageBlock(totalPages));
    }

    return visiblePages;
  };
  return (
    <div className="pagination">
      {currentPage > 1 && previousPageHandler()}
      {getVisiblePages()}
      {currentPage < totalPages && nextPageHandler()}
    </div>
  );
}
