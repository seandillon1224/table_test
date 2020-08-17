import React, { useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import tableReducer from "./state/reducers";
import TableNav from "./TableNav";
import SearchDropdown from "./SearchDropdown";
import tableFilter from "./TableFilter";
import { TableContainer, FilterBar, StyledNoData } from "./styles";
import Dropdown from "./Dropdown";
import TableHeaders from "./TableHeaders";
import TableBody from "./TableBody";
import FilterButtons from './FilterButtons'

const Context = React.createContext({})
export { Context };

const initialize = ({
  headers,
  initialSearch,
  rowsPerPageArray,
  initialRowsPerPage,
  filters,
}) => {
  return {
    rowsPerPageArray: [...rowsPerPageArray, "All"],
    rowsPerPage: initialRowsPerPage,
    currSort: { key: "", direction: "" },
    currFilters: [],
    filters,
    search: "",
    currSearch: initialSearch || headers[0].headerKey,
    page: 1,
    dropdownOpen: null,
  };
};

const Table = ({
  rows,
  rowsPerPageArray,
  initialSearch,
  initialRowsPerPage,
  filters,
  filterKey,
  children,
  headerKeys
}) => {

  const headers = !children ? headerKeys : children.filter(child => child.type.name === "Column").map(({props}) => { return {...props}});

  const [tableData, tableDataDispatch] = useReducer(
    tableReducer,
    initialize({
      headers,
      initialSearch,
      rowsPerPageArray,
      initialRowsPerPage,
      filters,
    })
  );

  const { search, currSort, currSearch, currFilters, rowsPerPage } = tableData;

  const currentPages = (data) => {
    let nums = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
      nums.push(i);
    }
    return nums;
  };

  const currentData = useMemo(
    () =>
      tableFilter(rows, {search, currSort, currSearch, headers, currFilters, filterKey}),
        [rows, search, currSort, currSearch, headers, currFilters, filterKey]
  );
  
  const pageNumbers = currentPages(currentData);
  
  const renderChildren = children.filter(child => child.type.name !== "Column");
    console.log(renderChildren)
  return (
    <Context.Provider
      value={{
        tableDataDispatch,
        tableData,
        headers,
        pageNumbers,
        currentData,
      }}
    >
      {!currentData.length && !currFilters.length ? (
        <StyledNoData>No Current Data</StyledNoData>
      ) : (
       renderChildren.length ? renderChildren({wow: "three"}) :
        <>
          <FilterBar>
            <SearchDropdown />
            <FilterButtons />
            <Dropdown />
          </FilterBar>
          <TableContainer>
            <TableHeaders />
            <TableBody />
          </TableContainer>
          <TableNav />
        </>
      )}
    </Context.Provider>
  );
};

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  rowsPerPageArray: PropTypes.array,
  initialSearch: PropTypes.string,
  initialRowsPerPage: PropTypes.number,
  filters: PropTypes.array,
  filterKey: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Table.defaultProps = {
  initialSearch: null,
  rowsPerPageArray: [],
  initialRowsPer: 5,
  filters: null,
  filterKey: "",
};

export default Table;
