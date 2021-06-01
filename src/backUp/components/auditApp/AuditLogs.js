import React, { useMemo, useState } from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import LabelsValuesInDialog from "../common/molecules/LabelsValuesInDialog";
import { useNavigate } from "react-router-dom";

const AuditLogs = (props) => {
  const {
    resource,
    columns,
    handleRemoteData,
    searchText,
    renderSubTable,
  } = props;

  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [viewMoreDetails, setViewMoreDetails] = useState(false);

  const memoizedTable = useMemo(
    () => (
      <Mtable
        style={{
          boxShadow: "none",
          padding: "16px",
          borderRadius: "25px 0px 0px 0px",
        }}
        title={""}
        columns={columns}
        data={handleRemoteData}
        detailPanel={[
          {
            icon: tableIcons.Expand,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_REQUEST_LOGS",
              "View request logs"
            ),
            render: (rowData) => {
              return renderSubTable(rowData);
            },
          },
        ]}
        actions={[
          (rowData) =>
            rowData.status === "FAILED" && {
              icon: tableIcons.BugReport,
              tooltip: getResourceValueByKey(
                resource,
                "VIEW_TRACES",
                "View traces"
              ),
              onClick: (e, rowData) => {
                let requestId = rowData.id;
                navigate(`${requestId}`);
              },
            },
          {
            icon: tableIcons.Details,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_MORE_DETAILS",
              "View more details"
            ),
            onClick: (event, rowData) => {
              setSelectedRow(rowData);
              setViewMoreDetails(true);
            },
          },
        ]}
        options={{
          searchText: searchText,
          sorting: true,
          filtering: true,
          draggable: false,
          pageSizeOptions: [5, 10, 15],
          pageSize: 10,
        }}
      />
    ),
    [handleRemoteData]
  );

  const handleClose = (e) => {
    e.stopPropagation();
    setViewMoreDetails(false);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  return (
    <>
      {viewMoreDetails && (
        <DialogBox
          open={true}
          handleClose={handleClose}
          dialogActions={dialogActions}
          title={getResourceValueByKey(resource, "MORE_INFO", "More Info")}
        >
          <LabelsValuesInDialog
            data={[
              {
                label: getResourceValueByKey(resource, "NETWORK", "Network"),
                value: selectedRow.networkName,
              },
              {
                label: getResourceValueByKey(resource, "TENANT", "Tenant"),
                value: selectedRow.tenantDisplayId,
              },
              {
                label: getResourceValueByKey(
                  resource,
                  "IP_ADDRESS",
                  "IP Address"
                ),
                value: selectedRow.ipaddress,
              },
              {
                label: getResourceValueByKey(resource, "EVENT_ID", "Event ID"),
                value: selectedRow.eventId,
              },
              {
                label: getResourceValueByKey(
                  resource,
                  "TIME_TAKEN",
                  "Time taken"
                ),
                value: `${selectedRow.timetaken}${getResourceValueByKey(
                  resource,
                  "MILLISECONDS",
                  "ms"
                )}`,
              },
            ]}
          />
        </DialogBox>
      )}

      {memoizedTable}
    </>
  );
};

export default AuditLogs;
