import React from "react";
import Table from "./components/Table/TableNew";
import Column from "./components/Table/Column";
import TableNav from "./components/Table/TableNav";
import {ChevronLeft, ChevronRight, FirstPage, LastPage} from '@material-ui/icons';

const rows = [
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
];
const manyRows = [
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
];

const doSomethingStrange = (e) => e.split("").join(" ");

const headerKeys = [
  {headerKey: "color", headerLabel: "Color", customTransform={doSomethingStrange}},
  {headerKey: "value", headerLabel: "Value"},
]

const App = () => (
  <>
    <Table headerKeys={headerkeys} rows={manyRows} rowsPerPageArray={[3, 5, 10]} initialRowsPerPage={5}>
      {(test) => (
        <>
        <div>HEYYY</div>
        {/* <Column
        headerKey="color"
        headerLabel="Value"
        customTransform={doSomethingStrange}
      />
      <Column headerKey="value" headerLabel="Value" /> */}
        </>
      )}
      {/* <TableNav/> */}
      {/* <TableNav>
        {({
          page,
          pageNumbers,
          pageNumbersArr,
          handleClick: { first, last, prev, next },
          dispatchPageClick,
        }) => {
          return (
            <div>
              <div className="pageNumbersLeftDiv">
                <FirstPage
                  className={page === 1 ? "chevronTableActive" : "chevronTable"}
                  onClick={first}
                />
                <ChevronLeft className="chevronTable" onClick={prev} />
              </div>
              <div className="pageNumbers">
                {pageNumbersArr.map((number) => {
                  return (
                    <li
                      className={
                        page === number ? "pageButtonsActive" : "pageButtons"
                      }
                      key={number}
                      id={number}
                      onClick={() => dispatchPageClick(number)}
                    >
                      {number}
                    </li>
                  );
                })}
              </div>
              <div className="pageNumbersRightDiv">
                <ChevronRight className="chevronTable" onClick={next} />
                <LastPage
                  className={
                    page === pageNumbers.length
                      ? "chevronTableActive"
                      : "chevronTable"
                  }
                  onClick={last}
                />
              </div>
            </div>
          );
        }}
      </TableNav> */}
      
    </Table>
  </>
);

export default App;
