import { Fragment } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="join w-full flex justify-center my-5">
      {pages.map((page) => (
        <Fragment key={page}>
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label={page}
            checked={currentPage === page}
            onChange={() => onPageChange(page)}
          />
          {/* <label>{page}</label> */}
        </Fragment>
      ))}
    </div>
  );
};

export default Pagination;
