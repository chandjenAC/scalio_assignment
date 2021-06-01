import React, { useState, useMemo } from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ViewContext from "./ViewContext";
import PathAndValue from "../common/organisms/PathAndValue";
import Mtable from "../common/organisms/Mtable";

const TopverseTraces = (props) => {
  const { resource, columns, handleRemoteData } = props;

  const [selectedRow, setSelectedRow] = useState(null);
  const [viewContext, setViewContext] = useState(false);
  const [viewReqRes, setViewReqRes] = useState(false);

  const memoizedTable = useMemo(
    () => (
      <Mtable
        style={{
          boxShadow: "none",
          padding: "16px",
          borderRadius: "25px 0px 0px 0px",
        }}
        columns={columns}
        data={handleRemoteData}
        actions={[
          {
            icon: tableIcons.Context,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_CONTEXT",
              "View context"
            ),
            onClick: (event, rowData) => {
              setSelectedRow(rowData);
              setViewContext(true);
            },
          },
          // {
          //   icon: tableIcons.Details,
          //   tooltip: getResourceValueByKey(
          //     resource,
          //     "VIEW_DETAILS",
          //     "View details"
          //   ),
          //   onClick: (event, rowData) => {
          //     setSelectedRow(rowData);
          //     setViewReqRes(true);
          //   },
          // },
        ]}
        options={{
          sorting: true,
          filtering: true,
          draggable: false,
          pageSize: 10,
          maxBodyHeight: 700,
        }}
      />
    ),
    [handleRemoteData]
  );

  return (
    <>
      {viewContext && (
        <ViewContext
          resource={resource}
          rowData={selectedRow}
          setViewContext={setViewContext}
        />
      )}
      {viewReqRes && (
        <PathAndValue
          ipAddress={selectedRow.ipaddress}
          requestData={selectedRow.response?.data}
          responseData={selectedRow.response?.data}
          setViewReqRes={setViewReqRes}
        />
      )}

      {memoizedTable}
    </>
  );
};

export default TopverseTraces;
