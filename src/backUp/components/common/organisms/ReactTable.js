import React, { useMemo } from "react";
import { useTable } from "react-table";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  theadTrTh: {
    // borderBottom: "solid 3px red",
    background: theme.palette.grey[100],
    padding: 8,
  },
  tbodyTrTd: {
    padding: "10px",
    borderBottom: "solid 1px lightgrey",
    // background: "papayawhip",
  },
}));

const ReactTable = (props) => {
  const { columns, data } = props;
  const classes = useStyles();
  const memoisedColumns = useMemo(() => columns, []);
  const memoisedData = useMemo(() => data, []);

  const tableInstance = useTable({
    columns: memoisedColumns,
    data: memoisedData,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    // apply the table props
    <table {...getTableProps()} className={classes.table}>
      <thead>
        {// Loop over the header rows
        headerGroups.map((headerGroup) => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map((column) => (
              // Apply the header cell props
              <th {...column.getHeaderProps()} className={classes.theadTrTh}>
                <Typography variant="subtitle2" color="textSecondary">
                  {column.render("Header")}
                </Typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        rows.map((row) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {// Loop over the rows cells
              row.cells.map((cell) => {
                // Apply the cell props
                return (
                  <td {...cell.getCellProps()} className={classes.tbodyTrTd}>
                    <Typography variant="body2">
                      {cell.render("Cell")}
                    </Typography>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
