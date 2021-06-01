import React, { useState, useMemo } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { useNavigate } from "react-router-dom";
import PreJsonInDialogBox from "../common/organisms/PreJsonInDialogBox";
import Mtable from "../common/organisms/Mtable";

const InstancesTable = (props) => {
  const {
    resource,
    getInstancesData,
    renderFlowsTable,
    recoverProcessInstance,
  } = props;
  const navigate = useNavigate();
  const instanceMetaColumns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
    },
    {
      field: "updateInfo.createdOn",
      title: getResourceValueByKey(resource, "CREATED_ON", "Created On"),
      dontTruncate: true,
      type: "datetime",
    },
    {
      field: "updateInfo.updatedOn",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      dontTruncate: true,
      type: "datetime",
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
    },
  ];

  const [viewContext, setViewContext] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const memoizedTable = useMemo(
    () => (
      <Mtable
        style={{
          boxShadow: "none",
          padding: "16px",
          borderRadius: "25px 0px 0px 0px",
        }}
        columns={instanceMetaColumns}
        data={getInstancesData}
        detailPanel={[
          {
            icon: tableIcons.Expand,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_PROCESS_INSTANCE_FLOW",
              "View Process Instance Flow"
            ),
            render: (rowData) => {
              return renderFlowsTable(rowData);
            },
          },
        ]}
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
          {
            icon: tableIcons.Logs,
            tooltip: getResourceValueByKey(resource, "VIEW_LOGS", "View logs"),
            onClick: (e, rowData) =>
              navigate(`${rowData.id}`, {
                state: {
                  processInstanceId: rowData.id,
                  goBack: true,
                },
              }),
          },
          (rowData) =>
            rowData.status === "Failed" && {
              icon: tableIcons.Reload,
              tooltip: getResourceValueByKey(resource, "RECOVER", "Recover"),
              onClick: (event, rowData) => recoverProcessInstance(rowData.id),
            },
        ]}
        options={{
          search: false,
          sorting: false,
          detailPanelColumnAlignment: "left",
          draggable: false,
          pageSizeOptions: [5, 10, 15],
          pageSize: 15,
          maxBodyHeight: 670,
        }}
      />
    ),
    [getInstancesData]
  );

  return (
    <>
      {viewContext && (
        <PreJsonInDialogBox
          json={selectedRow?.processcontext?.contextInfo}
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

      {memoizedTable}
    </>
  );
};

export default InstancesTable;
