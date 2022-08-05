import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({ currentPage, setCurrentPage }) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
