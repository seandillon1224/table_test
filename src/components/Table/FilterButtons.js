import React, { useContext } from "react";
import { Context } from "./TableNew";
import { handleFilter } from "./state/actions";
import { StyledButton } from "./styles";

const FilterButtons = () => {
  const { tableData, tableDataDispatch } = useContext(Context);
  const { currFilters, filters } = tableData;
  const dispatchFilter = (val) => tableDataDispatch(handleFilter(val));
  return (
    <div className="filterButtons">
      {filters &&
        filters.map((filt) => (
          <StyledButton
            key={filt}
            buttonselected={currFilters.includes(filt)}
            onClick={() => dispatchFilter(filt)}
          >
            {filt}
          </StyledButton>
        ))}
    </div>
  );
};

export default FilterButtons;
