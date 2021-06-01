import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import PreJsonInDialogBox from "../common/organisms/PreJsonInDialogBox";
import Mtable from "../common/organisms/Mtable";

const FlowsTable = (props) => {
  const { resource, getInstanceFlowsData, instancesRowData } = props;
  const instanceFlowsColumns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
    },
    {
      field: "processInstanceStep",
      title: getResourceValueByKey(
        resource,
        "PROCESS_INSTANCE_STEP",
        "Process Instance Step"
      ),
      dontTruncate: true,
    },
    {
      field: "updateInfo.updatedOn",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      dontTruncate: true,
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
    },
  ];

  const [viewContext, setViewContext] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  return (
    <>
      {viewContext && (
        <PreJsonInDialogBox
          json={selectedRow?.stepcontext}
          title={getResourceValueByKey(
            resource,
            "CONTEXT_INFO",
            "Context Info"
          )}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewContext}
        />
      )}
      <Mtable
        style={{ boxShadow: "none", padding: "6px 12px" }}
        columns={instanceFlowsColumns}
        data={(query) => getInstanceFlowsData(query, instancesRowData)}
        title={getResourceValueByKey(
          resource,
          "PROCESS_INSTANCE_FLOW_STATES",
          "Process Instance Flow States"
        )}
        actions={[
          {
            icon: tableIcons.Context,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_CONTEXT",
              "View context"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewContext(true);
            },
          },
        ]}
        options={{
          search: false,
          sorting: false,
          draggable: false,
          pageSize: 10,
        }}
      />
    </>
  );
};

export default FlowsTable;
