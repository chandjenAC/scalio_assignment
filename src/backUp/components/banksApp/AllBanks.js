import React, { useState } from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";
import ViewFailureReason from "./ViewFailureReason";

const AllBanks = (props) => {
  const {
    resource,
    columns,
    getBanks,
    addBank,
    updateBank,
    deleteBank,
  } = props;

  const [selectedRow, setSelectedRow] = useState({});
  const [viewFailureReason, setViewFailureReason] = useState(false);

  return (
    <>
      <Mtable
        style={{
          boxShadow: "none",
          padding: "16px",
          borderRadius: "25px 0px 0px 0px",
        }}
        columns={columns}
        data={getBanks}
        localization={{
          toolbar: {
            searchPlaceholder: getResourceValueByKey(
              resource,
              "SEARCH_BY_BANK_NAME",
              "Search by Bank Name"
            ),
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addBank(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateBank(newData);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteBank(oldData);
                resolve();
              }, 1000);
            }),
        }}
        actions={[
          (rowData) =>
            rowData.status === "Inactive" && {
              icon: tableIcons.BugReport,
              tooltip: getResourceValueByKey(
                resource,
                "VIEW_REASON_FOR_FAILURE",
                "View reason for failure"
              ),
              onClick: (e, rowData) => {
                setSelectedRow(rowData);
                setViewFailureReason(true);
              },
            },
        ]}
        options={{
          filtering: true,
          search: false,
          sorting: false,
          paging: true,
          detailPanelColumnAlignment: "left",
          draggable: false,
          pageSize: 10,
          maxBodyHeight: 670,
        }}
      />
      {viewFailureReason && (
        <ViewFailureReason
          resource={resource}
          selectedRow={selectedRow}
          setViewFailureReason={setViewFailureReason}
        />
      )}
    </>
  );
};

export default AllBanks;
