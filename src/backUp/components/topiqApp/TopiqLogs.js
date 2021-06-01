import React, { useState, useMemo } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import PreJsonInDialogBox from "../common/organisms/PreJsonInDialogBox";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import Mtable from "../common/organisms/Mtable";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";

const TopiqLogs = (props) => {
  const { resource, getTopiqLogs, renderLogDetails } = props;
  const columns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
      copy: true,
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      dontTruncate: true,
    },

    {
      field: "source.name",
      title: getResourceValueByKey(resource, "SOURCE", "Source"),
      dontTruncate: true,
    },
    {
      field: "trigger.name",
      title: getResourceValueByKey(resource, "TRIGGER", "Trigger"),
    },
    {
      field: "receivedOn",
      title: getResourceValueByKey(resource, "RECEIVED_ON", "Received On"),
      type: "datetime",
    },
    {
      field: "lastupdatedOn",
      title: getResourceValueByKey(
        resource,
        "LAST_UPDATED_ON",
        "Last Updated On"
      ),
      type: "datetime",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const [viewPayload, setViewPayload] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const memoizedTable = useMemo(
    () => (
      <Mtable
        style={{
          boxShadow: "none",
          padding: "16px",
          borderRadius: "25px 0px 0px 0px",
        }}
        columns={columns}
        data={getTopiqLogs}
        detailPanel={[
          {
            icon: tableIcons.Expand,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_LOG_DETAILS",
              "View log details"
            ),
            render: (rowData) => {
              return renderLogDetails(rowData);
            },
          },
        ]}
        actions={[
          {
            icon: tableIcons.Context,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_PAYLOAD",
              "View payload"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewPayload(true);
            },
          },
          (rowData) =>
            rowData.status !== "success" && {
              icon: tableIcons.Reload,
              tooltip: getResourceValueByKey(
                resource,
                "RETRIGGER",
                "Retrigger"
              ),
              onClick: async () => {
                let response = await post(env.DMS_RECOVER_LOG, {
                  id: rowData.id,
                });
                renderSnackbar(enqueueSnackbar, response);
              },
            },
        ]}
        options={{
          search: false,
          sorting: false,
          paging: true,
          draggable: false,
          pageSize: 15,
          pageSizeOptions: [5, 10, 15],
        }}
      />
    ),
    [getTopiqLogs]
  );

  return (
    <>
      {viewPayload && (
        <PreJsonInDialogBox
          json={selectedRow.payload}
          title={getResourceValueByKey(resource, "PAYLOAD", "Payload")}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewPayload}
        />
      )}

      {memoizedTable}
    </>
  );
};

export default TopiqLogs;
