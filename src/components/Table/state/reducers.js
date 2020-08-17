const tableReducer = (tableData, action) => {
  console.log(action)
  switch (action.type) {
    
    case "sortHandler": {
      const { column } = action;
      const { direction, key } = tableData.currSort;
      if (!column) return;
      if (key !== column)
        return {
          ...tableData,
          currSort: { key: column, direction: 1 },
          page: 1,
        };
      const currNum = direction === 0 ? 1 : direction === 1 ? -1 : 0;
      return {
        ...tableData,
        currSort: { key: column, direction: currNum, page: 1 },
      };
    }
    case "pageClick": {
      const { page } = action;
      return { ...tableData, page: +page };
    }
    case "handleFilter": {
      const { filter } = action;
      const { currFilters } = tableData;
      if (currFilters.includes(filter)) {
        return {
          ...tableData,
          currFilters: currFilters.filter((x) => x !== filter),
          page: 1,
        };
      }
      return { ...tableData, currFilters: [...currFilters, filter], page: 1 };
    }
    case "paginate": {
      let page;
      const { page: currentPage } = tableData;
      const { pageNumbers, direction } = action;
      if (direction === "last") page = pageNumbers.length;
      if (direction === "first") page = pageNumbers[0];
      if (direction === "left" && currentPage === 1) page = pageNumbers.length;
      if (direction === "left" && currentPage !== 1) page = currentPage - 1;
      if (direction === "right" && currentPage === pageNumbers.length)
        page = pageNumbers[0];
      if (direction === "right" && currentPage !== pageNumbers.length)
        page = currentPage + 1;
      return { ...tableData, page };
    }
    case "setRowsPerPage": {
      const { rowsPerPage } = action;
      return { ...tableData, rowsPerPage, page: 1 };
    }
    case "dropdown": {
      const { dropdownOpen } = action;
      return { ...tableData, dropdownOpen };
    }
    case "searchParameter": {
      const { currSearch } = action;
      return { ...tableData, currSearch, page: 1 };
    }
    case "search": {
      const { search } = action;
      return { ...tableData, search, page: 1 };
    }
    default: {
      return false;
    }
  }
};
export default tableReducer;
