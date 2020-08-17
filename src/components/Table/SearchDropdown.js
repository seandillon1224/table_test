import React, { useState, useRef, useEffect, useContext } from "react";
import {setSearch, setSearchParameter} from './state/actions';
import { ArrowDropDown } from "@material-ui/icons";
import {Context} from './TableNew'
import {StyledList, StyledClose} from './styles';


const SearchDropdown = () => {
  const {tableDataDispatch, tableData: {search, currSearch}, headers} = useContext(Context);
  const searchNode = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  });

  const checkSearchType = type => {
    if (type.key === currSearch) return { color: "green" };
    return null;
  };

  const handleClick = e => {
    if (
      searchNode &&
      searchNode.current &&
      searchNode.current.contains(e.target)
    ) {
      return;
    }
    setOpen(false);
  };
  return (
    <StyledList right="-200px" className="search">
      <div className="innerSearchDiv">
        <input
          className="searchDiv"
          value={search}
          placeholder={headers.find(x => x.headerKey === currSearch).label}
          onChange={e => tableDataDispatch(setSearch(e.target.value))}
        />
        <StyledClose
          onClick={() => tableDataDispatch(setSearch(""))}
        />
        <ArrowDropDown onClick={() => setOpen(true)} />
      </div>

      {open && (
        <div className="ternaryContainer" ref={searchNode}>
          <ul>
            {headers
              .filter(y => !y.sortless)
              .map(x => (
                <li
                  style={checkSearchType(x)}
                  key={x.headerKey}
                  onClick={() => {
                    tableDataDispatch(setSearchParameter(x.headerKey));
                    setOpen(false);
                  }}
                >
                  {x.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </StyledList>
  );
};
export default SearchDropdown;
