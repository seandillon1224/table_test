
const pipeWithConfig = (...fns) => (x, y) => fns.reduce((v, f) => f(v,y), x);

const tableFilter = (rows, currArgs) => {
  return pipeWithConfig(sortFilter, searchFilter, filterByKey)(rows, currArgs)
}

const sortFilter = (data, config) => {
  const {currSort} = config
  if (currSort && currSort.key && currSort.direction) {
    // todo: handle different types of data in sorts (dates, etc);
    // let isDate = headers.find((x) => x.headerKey === currSort.key).date ? 1 : 0;
    let mutable = [...data];
    console.log(currSort)
    let directionOne = currSort.direction === 1 ? -1 : 1;
    let directionTwo = currSort.direction === 1 ? 1 : -1;
    return mutable.sort((a, b) =>
      a[currSort.key] < b[currSort.key] ? directionOne : directionTwo
    );
  }
  return data;
};

const searchFilter = (data, config) => {
  const {search, currSearch} = config;
  if (!search) return data;
  let searchRes = data.filter(
    (val) =>
      val[currSearch]
        .toString()
        .toLowerCase()
        .indexOf(search.toLowerCase().trim()) !== -1
  );
  // todo: is it best to return all data if search is "empty" or display none, seen loads of different implementations of this.
  if (searchRes.length > 0) return searchRes;
  return data;
};

const filterByKey = (data, config) => {
  const {currFilters, filterKey} = config;
  if (!currFilters || !currFilters.length || !filterKey) return data;
  return data.filter((curr) => currFilters.includes(curr[filterKey]));
};

export default tableFilter;
