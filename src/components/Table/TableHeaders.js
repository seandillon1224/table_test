import React, { useContext } from "react";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@material-ui/icons";
import { Context } from "./TableNew";
import { sortHandler } from "./state/actions";
import { CellHeader } from "./styles";

const TableHeaders = () => {
  const {
    tableDataDispatch,
    headers,
    tableData: {
      currSort: { key, direction },
    },
  } = useContext(Context);
  const dispatchSort = (val) => tableDataDispatch(sortHandler(val));
  // handle sort arrow ui
  const currArrow = (currKey) => {
    if (currKey !== key || !direction) return <UnfoldMore />;
    if (currKey === key && direction === 1) return <ArrowDownward />;
    if (currKey === currKey && direction === -1) return <ArrowUpward />;
  };

  return (
    <thead>
      <tr>
        {headers.map((column) => (
          <CellHeader onClick={() => dispatchSort(column.headerKey)} key={column.headerKey}>
            <div className="cellDiv">
              {column.headerLabel}
              {!column.sortless && currArrow(column.headerKey)}
            </div>
          </CellHeader>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
