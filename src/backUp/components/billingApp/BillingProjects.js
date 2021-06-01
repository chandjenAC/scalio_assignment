import React, { useMemo } from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const BillingProjects = (props) => {
  const {
    resource,
    getBillingProjects,
    columns,
    renderPricingBooksTable,
    addBillingProjects,
    updateBillingProjects,
    deleteBillingProjects,
  } = props;

  const memoizedTable = useMemo(
    () => (
      <Mtable
        style={{
          boxShadow: "none",
          padding: "0px 16px",
        }}
        columns={columns}
        data={getBillingProjects}
        detailPanel={[
          {
            icon: tableIcons.Expand,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_PRICE_BOOK",
              "View price book"
            ),
            render: (rowData) => {
              return renderPricingBooksTable(rowData);
            },
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addBillingProjects(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateBillingProjects(newData);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteBillingProjects(oldData);
                resolve();
              }, 1000);
            }),
        }}
        options={{
          search: false,
          sorting: false,
          paging: true,
          detailPanelColumnAlignment: "left",
          draggable: false,
          pageSize: 20,
          maxBodyHeight: 575,
        }}
      />
    ),
    [getBillingProjects]
  );

  return memoizedTable;
};

export default BillingProjects;
