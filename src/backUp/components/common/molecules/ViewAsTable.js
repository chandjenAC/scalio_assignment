import React from "react";
import Table from "../atoms/Table/Table";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  invoiceTableRoot: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

const ViewAsTable = (props) => {
  const { data, columnHeadings } = props;
  const classes = useStyles();

  return (
    columnHeadings && (
      <Box className={classes.invoiceTableRoot}>
        <Table width="100%">
          <thead>
            <tr>
              {columnHeadings.map((th, index) => {
                return <th key={index}>{th.displayName}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => {
              return (
                <tr key={index}>
                  {columnHeadings.map((item, i) => {
                    return (
                      <td key={i} style={{ padding: "8px 0px" }}>
                        {rowData[item.name]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
    )
  );
};

export default ViewAsTable;
