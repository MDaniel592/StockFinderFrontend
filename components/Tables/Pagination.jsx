import React from "react";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({ setMaxTableList, maxTableList, tableLen }) {

  const itemsPerPage = maxTableList[1] - maxTableList[0] + 1;
  const pageCount = Math.ceil(tableLen / itemsPerPage);

  const handlePageClick = (event) => {
    if (event.nextSelectedPage === undefined) return;
    const newOffset = event.nextSelectedPage * itemsPerPage;
    const lastItem = newOffset + itemsPerPage - 1
    setMaxTableList([newOffset, lastItem]);
  };

  return (
    <div name="Pagination" className="mx-auto my-2">
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        onClick={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        className="flex justify-center text-center gap-1 sm:gap-2"
        pageClassName="d-block font-bold px-3 py-1 rounded-lg text-white bg-zinc-700  hover:bg-blue-400"
        activeClassName="rounded-lg bg-blue-700"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
