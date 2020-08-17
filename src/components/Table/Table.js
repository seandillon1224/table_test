import React, { useState, useMemo } from "react";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@material-ui/icons";
import TableNav from "./TableNav";
import SearchDropdown from "./SearchDropdown";
import Dropdown from "./Dropdown";
import tableFilter from "./TableFilter";
import moment from "moment";
import {
  TableContainer,
  FilterBar,
  CellHeader,
  NullCell,
  Showing,
  StyledNoData,
  StyledButton
} from "./styles";

/** 
@param Table
TableHeaders: object in format {id: "", label: "", key: ""}
*/

const Table = ({
  data,
  initialSearch,
  initialRowsPer = 10,
  tableHeaders,
  filters,
  filterKey
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPer);
  const [currFilters, setCurrFilters] = useState([]);
  const [page, setPage] = React.useState(1);
  const [currSort, setCurrSort] = useState({ key: "", direction: "" });
  const [currSearch, setCurrSearch] = useState(initialSearch);
  const [search, setSearch] = useState("");
  // util funcs
  const sortHandler = column => {
    setPage(1);
    let { key, sortless } = column;

    if (!key || sortless) return;

    if (currSort.key === key) {
      let direction = !currSort.direction
        ? 1
        : currSort.direction === 1
        ? 2
        : "";
      setCurrSort({ ...currSort, direction });
    } else {
      setCurrSort({
        key,
        direction: 1
      });
    }
  };

  const currentPages = data => {
    let nums = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
      nums.push(i);
    }
    return nums;
  };

  const handlePageClick = event => setPage(Number(event.target.id));
  const handleFilter = filt => {
    setPage(1);
    if (currFilters.includes(filt))
      setCurrFilters(currFilters.filter(x => x !== filt));
    else setCurrFilters([...currFilters, filt]);
  };
  const paginate = direction => {
    let pageNumbers = currentPages(tableData);
    if (direction === "last") {
      setPage(pageNumbers.length);
      return;
    }
    if (direction === "first") {
      setPage(pageNumbers[0]);
      return;
    }
    direction === "left" && page === 1
      ? setPage(pageNumbers.length)
      : direction === "left" && page !== 1
      ? setPage(page - 1)
      : direction === "right" && page === pageNumbers.length
      ? setPage(pageNumbers[0])
      : setPage(page + 1);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e);
    setPage(1);
  };

  // handle sort arrow ui
  const currArrow = key => {
    if (key !== currSort.key || !currSort.direction) return <UnfoldMore />;
    if (key === currSort.key && currSort.direction === 1)
      return <ArrowDownward />;
    if (key === currSort.key && currSort.direction === 2)
      return <ArrowUpward />;
  };

  const tableData = useMemo(
    () =>
      tableFilter(
        data,
        search,
        currSort,
        currSearch,
        tableHeaders,
        currFilters,
        filterKey
      ),
    [data, search, currSort, currSearch, tableHeaders, currFilters, filterKey]
  );
  const handleDropdown = event => setDropdownOpen(event.currentTarget);
  const openDropdown = Boolean(dropdownOpen);

  return !tableData.length && !currFilters.length ? (
    <StyledNoData>No Current Data</StyledNoData>
  ) : (
    <>
      <FilterBar>
        <SearchDropdown
          currSearch={currSearch}
          setCurrSearch={setCurrSearch}
          search={search}
          setSearch={setSearch}
          relatedData={tableHeaders}
          reset={() => setPage(1)}
        />
        <div className="filterButtons">
          {filters &&
            filters.map(filt => (
              <StyledButton
                key={filt}
                buttonselected={currFilters.includes(filt)}
                onClick={() => handleFilter(filt)}
              >
                {filt}
              </StyledButton>
            ))}
        </div>
        <div className="rightFilter">
          <div className="rowsDisplayedDiv">
            <span>Showing</span>
            <Dropdown
              rowValue={rowsPerPage}
              open={openDropdown}
              anchorEl={dropdownOpen}
              setRowsPerPage={handleChangeRowsPerPage}
              handleDropdown={handleDropdown}
              handleClose={setDropdownOpen}
              items={[5, 10, 20]}
            />
            <span> rows per page</span>
          </div>
        </div>
      </FilterBar>

      <TableContainer>
        <thead>
          <tr>
            {tableHeaders.map(column => (
              <CellHeader onClick={() => sortHandler(column)} key={column.id}>
                <div className="cellDiv">
                  {column.label}
                  {!column.sortless && currArrow(column.key)}
                </div>
              </CellHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData
            .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
            .map((row, index) => (
              <tr key={index}>
                {tableHeaders.map(x => (
                  <NullCell key={x.key}>
                    {Array.isArray(row[x.key]) ? (
                      <ul style={{ maxHeight: "150px", overflowY: "auto" }}>
                        {row[x.key].map((y, index) => (
                          <li key={index}>{x.arrayVal ? y[x.arrayVal] : y}</li>
                        ))}
                      </ul>
                    ) : x.date ? (
                      moment(row[x.key]).format("MM/DD/YYYY h:mm a")
                    ) : (
                      row[x.key]
                    )}
                  </NullCell>
                ))}
              </tr>
            ))}
        </tbody>
      </TableContainer>
      {tableData.length ? (
        <Showing>
          <TableNav
            pageNumbers={currentPages(tableData)}
            currentPage={page}
            handlePageClick={handlePageClick}
            handleArrowClick={paginate}
          />
        </Showing>
      ) : null}
    </>
  );
};

export default Table;
