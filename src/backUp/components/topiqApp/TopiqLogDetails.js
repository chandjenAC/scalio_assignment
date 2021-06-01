import React, { useState, useMemo } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { Fade, Paper } from "@material-ui/core";
import PreJsonInDialogBox from "../common/organisms/PreJsonInDialogBox";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import Mtable from "../common/organisms/Mtable";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";

const TopiqLogDetails = (props) => {
  const { resource, logRowData, getTopiqLogDetails } = props;
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
      field: "retryCount",
      title: getResourceValueByKey(resource, "RETRY_COUNT", "Retry Count"),
      dontTruncate: true,
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

  const [viewAction, setViewAction] = useState(false);
  const [viewResponse, setViewResponse] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const memoizedTable = useMemo(
    () => (
      <Mtable
        style={{ boxShadow: "none", padding: "0px 16px 16px 16px" }}
        columns={columns}
        data={(query) => getTopiqLogDetails(query, logRowData)}
        title={getResourceValueByKey(resource, "DETAILS", "Details")}
        actions={[
          {
            icon: tableIcons.Request,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_ACTION",
              "View action"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewAction(true);
            },
          },
          {
            icon: tableIcons.Response,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_RESPONSE",
              "View response"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewResponse(true);
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
                let response = await post(env.DMS_RECOVER_LOG_DETAIL, {
                  id: rowData.id,
                });
                renderSnackbar(enqueueSnackbar, response);
              },
            },
        ]}
        options={{
          search: false,
          sorting: false,
          paging: false,
          draggable: false,
          pageSize: 5,
        }}
      />
    ),
    [getTopiqLogDetails]
  );

  return (
    <>
      {viewResponse && (
        <PreJsonInDialogBox
          json={selectedRow.response.data}
          title={getResourceValueByKey(resource, "RESPONSE", "Response")}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewResponse}
        />
      )}

      {viewAction && (
        <PreJsonInDialogBox
          json={JSON.stringify(selectedRow.action)}
          title={getResourceValueByKey(resource, "ACTION", "Action")}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewAction}
        />
      )}
      <Fade in={true} timeout={500}>
        <Paper elevation={0}>{memoizedTable}</Paper>
      </Fade>
    </>
  );
};

export default TopiqLogDetails;
