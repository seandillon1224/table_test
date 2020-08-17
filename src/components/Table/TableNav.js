import React, { useContext } from "react";
import { Context } from "./TableNew";
import { handlePaginate, pageClick } from "./state/actions";
//styles
import { PageNumberDiv } from "./styles";
//icons
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@material-ui/icons";

const TableNav = ({children}) => {
  const {
    tableDataDispatch,
    tableData: { page },
    pageNumbers
  } = useContext(Context);

  const dispatchPaginate = (direction) => tableDataDispatch(handlePaginate(pageNumbers, direction));
  const dispatchPageClick = (val) => tableDataDispatch(pageClick(val));
  const [first, last, prev, next] = ["first", "last", "left", "right"].map(direction => () => dispatchPaginate(direction))

  let pageNumbersArr = pageNumbers;
  if (pageNumbers.length > 3 && page !== 1) pageNumbersArr = [...pageNumbers.slice(page-2, page+1)];
  if (pageNumbers.length > 3 && page === 1) pageNumbersArr = [page, page+1];
  const renderPageNumbers = pageNumbersArr.map((number) => {
    return (
      <li
        className={
          page === number ? "pageButtonsActive" : "pageButtons"
        }
        key={number}
        id={number}
        onClick={() => dispatchPageClick(number)}
      >
        {number}
      </li>
    );
  });
  
  if (children) return children({page, pageNumbers, dispatchPageClick, pageNumbersArr, handleClick: {first, last, prev, next}})

  return (
    <PageNumberDiv>
      <div className="pageNumbersLeftDiv">
        <FirstPage
          className={page === 1 ? "chevronTableActive" : "chevronTable"}
          onClick={first}
        />
        <ChevronLeft
          className="chevronTable"
          onClick={prev}
        />
      </div>
      <div className="pageNumbers">{renderPageNumbers}</div>
      <div className="pageNumbersRightDiv">
        <ChevronRight
          className="chevronTable"
          onClick={next}
        />
        <LastPage
          className={
            page === pageNumbers.length
              ? "chevronTableActive"
              : "chevronTable"
          }
          onClick={last}
        />
      </div>
    </PageNumberDiv>
  );
};

export default TableNav;
