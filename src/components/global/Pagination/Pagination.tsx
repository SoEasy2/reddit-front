import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import cx from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

interface IProps {
  className?: string;
  arrayCount: number;
  itemsPerPage: number;
  activeLinkClassName?: string;
  buttonArrow?: string;
  pageLinkClassName?: string;
  arrowRight: string;
  arrowLeft: string;
}
const Pagination: React.FC<IProps> = ({
  className,
  arrayCount,
  itemsPerPage,
  activeLinkClassName,
  buttonArrow,
  arrowLeft,
  arrowRight,
  pageLinkClassName,
}) => {
  const dispatch = useAppDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(arrayCount / itemsPerPage));
    pageCount <= 0 ? setPageCount(1) : null;
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % arrayCount;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        className={className}
        activeLinkClassName={activeLinkClassName}
        previousLinkClassName={cx(buttonArrow, arrowLeft)}
        nextLinkClassName={cx(buttonArrow, arrowRight)}
        pageLinkClassName={pageLinkClassName}
      />
    </>
  );
};

export { Pagination };
