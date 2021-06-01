import React from "react";
import Table from "../common/atoms/Table/Table";
import RenderAttributes from "../../utils/RenderAttributes";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    height: "100%",
    width: "100%",
  },
}));

const WhitelistedTable = (props) => {
  const { data, columnHeadings } = props;
  const classes = useStyles();
  return (
    <Box className={classes.tableBox}>
      <Table width="100%">
        <thead>
          <tr>
            {columnHeadings.map((th, index) => {
              return <th key={index}>{th.displayName}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                {columnHeadings.map((key, i) => {
                  return (
                    <td key={i} style={{ padding: "8px 0px" }}>
                      <RenderAttributes
                        data={row}
                        keyObj={key}
                        disableLabel={true}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};

export default WhitelistedTable;
