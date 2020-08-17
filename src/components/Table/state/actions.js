const sortHandler = (column) => {
  return {
    type: "sortHandler",
    column,
  };
};
const pageClick = (page) => {
  return {
    type: "pageClick",
    page,
  };
};
const handleFilter = (filter) => {
  return {
    type: "handleFilter",
    filter,
  };
};
const handlePaginate = (pageNumbers, direction) => {
  return {
    type: "paginate",
    pageNumbers,
    direction
  };
};
const setRowsPerPage = (rowsPerPage) => {
  return {
    type: "setRowsPerPage",
    rowsPerPage,
  };
};
const toggleDropdown = (dropdownOpen) => {
  return {
    type: "dropdown",
    dropdownOpen,
  };
};
const setSearchParameter = (currSearch) => {
  return {
    type: "searchParameter",
    currSearch,
  };
};
const setSearch = (searchText) => {
  return {
    type: "search",
    search: searchText,
  };
};

export {
  sortHandler,
  pageClick,
  handleFilter,
  handlePaginate,
  setRowsPerPage,
  toggleDropdown,
  setSearchParameter,
  setSearch,
};
