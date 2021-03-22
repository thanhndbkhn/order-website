import React, { useState } from "react"
import { PaginationItem, PaginationWrap } from "../style/Pagination"
import { DEFAULT_PAGINATION_OFFSET, RECORD_PER_PAGE_OPTIONS } from "../../constants/common.constants";

export interface IPaginationProps {
  total?: number
  changePageNumberCb: (pageNumber: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGINATION_OFFSET);

  const changePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber);
    props.changePageNumberCb(pageNumber - 1);
  }

  return (
    <PaginationWrap>
      {pageNumber > 1 && <PaginationItem onClick={() => changePageNumber(pageNumber - 1)} >{'<'}</PaginationItem>}
      {RECORD_PER_PAGE_OPTIONS.map((item, idx) =>
        <PaginationItem key={idx} active={pageNumber === idx + 1} onClick={() => changePageNumber(idx + 1)}>{idx + 1}</PaginationItem>
      )}
      {(pageNumber < RECORD_PER_PAGE_OPTIONS.length) && <PaginationItem onClick={() => changePageNumber(pageNumber + 1)}>{'>'}</PaginationItem>}
    </PaginationWrap>
  )
}
