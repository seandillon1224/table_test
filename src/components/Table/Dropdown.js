import React, { useContext } from "react";
//styles
import styled from "styled-components";
//components
import { MenuItem, Menu } from "@material-ui/core";
import TableButton from "./TableButton";
//Context
import { Context } from "./TableNew";
import { setRowsPerPage, toggleDropdown } from "./state/actions";

const StyledButton = styled(TableButton)`
  margin: 5px;
  font-size: 17px;
  background-color: #ffffff;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.slateGrey};
  width: 75px;
  border: 1px solid ${(props) => props.theme.backgroundLightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 1px;
  width: ${(props) => props.width};
  margin-right: ${(props) => props.marginRight};
`;

const Dropdown = () => {
  const {
    tableData: { dropdownOpen, rowsPerPage, rowsPerPageArray },
    tableDataDispatch,
  } = useContext(Context);
  const dispatchRowsPerPage = (val) => tableDataDispatch(setRowsPerPage(val));
  const dispatchDropdown = (val) => tableDataDispatch(toggleDropdown(val));
  return (
    <div className="rightFilter">
      <div className="rowsDisplayedDiv">
        <span>Showing</span>

        <StyledButton
          className="button"
          aria-owns={dropdownOpen ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={(e) => dispatchDropdown(e.currentTarget)}
          arrow={true}
          arrowDirection={dropdownOpen ? true : false}
          text={rowsPerPage}
        />
        <Menu
          anchorEl={dropdownOpen}
          id="menu-appbar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={Boolean(dropdownOpen)}
          onClose={() => dispatchDropdown(null)}
        >
          {rowsPerPageArray.map((item) => {
            return (
              <MenuItem
                onClick={() => {
                  dispatchRowsPerPage(item);
                  dispatchDropdown(false);
                }}
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            );
          })}
        </Menu>
        <span> rows per page</span>
      </div>
    </div>
  );
};

export default Dropdown;
