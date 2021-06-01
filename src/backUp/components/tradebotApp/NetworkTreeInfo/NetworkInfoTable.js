import React from "react";
import LabelAndValue from "../../common/LabelAndValue";
import Table from "../../common/atoms/Table/Table";
import { Typography } from "@material-ui/core";

const NetworkInfoTable = (props) => {
  const { tableData, columnHeadings } = props;
  return (
    <Table width="100%">
      <thead>
        <tr>
          {columnHeadings.map((th, index) => {
            return (
              <th key={index} style={{ padding: "0px 0px 0px 4px" }}>
                <Typography variant="subtitle2" align="left">
                  {th}
                </Typography>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((rowData, index) => {
          return (
            <tr key={index}>
              {Object.keys(rowData).map((key, i) => {
                return (
                  <td
                    key={i}
                    style={{ padding: "0px 0px 0px 4px", width: "33.3%" }}
                  >
                    {typeof rowData[key] === "object" ? (
                      <LabelAndValue
                        key={index}
                        label={rowData[key].label}
                        value={rowData[key].value}
                      />
                    ) : (
                      <Typography variant="body2" align="left">
                        {rowData[key]}
                      </Typography>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default NetworkInfoTable;
