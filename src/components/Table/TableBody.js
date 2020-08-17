import React, { useContext } from "react";
import { Context } from "./TableNew";
import { NullCell } from "./styles";

const TableBody = () => {
  const {
    tableData: { rowsPerPage, page },
    headers,
    currentData
  } = useContext(Context);
 
  return (
    <tbody>
      {currentData
        .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
        .map((row, index) => (
          <tr key={index}>
            {headers.map((x) => (
              <NullCell key={x.headerKey}>{row[x.headerKey]}</NullCell>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
