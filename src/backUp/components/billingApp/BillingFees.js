import React from "react";
// import { tableIcons } from "../../utils/materialTable/materialTableIcons";
// import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const mTableStyles = {
  boxShadow: "none",
  padding: "0px 12px 12px 12px",
};

const BillingFees = (props) => {
  const {
    // resource,
    getBillingFees,
    selectedRows,
    columns,
    txnType,
    reloadTable,
    handleSelectRows,
    // setViewCalculationInfo,
    // setSelectedRow,
  } = props;

  

  return (
    <Mtable
      style={mTableStyles}
      hideRefreshIcon={true}
      reload={reloadTable}
      // title={getResourceValueByKey(resource, "FEE", "Fee")}
      columns={columns}
      data={getBillingFees}
      localization={{ header: { actions: "" } }}
      onSelectionChange={(rows, selectedRow) =>
        handleSelectRows(txnType, selectedRow)
      }
      // actions={[
      //   {
      //     name: "calculationInfo",
      //     icon: tableIcons.Calculator,
      //     tooltip: getResourceValueByKey(
      //       resource,
      //       "VIEW_CALCULATION_INFO",
      //       "View calculation info"
      //     ),
      //     onClick: (event, rowData) => {
      //       setSelectedRow(rowData);
      //       setViewCalculationInfo(true);
      //     },
      //     position: "row",
      //     disabled: false,
      //     hidden: false,
      //   },
      // ]}
      options={{
        toolbar: false,
        selection: true,
        selectionProps: (rowData) => {
          const defaultProps = {
            disabled: rowData.status === "Billed",
            color: "primary",
            background: "blue",
          };
          if (selectedRows?.[txnType]?.find((row) => row.id === rowData.id)) {
            return {
              checked: true,
              ...defaultProps,
            };
          } else {
            return defaultProps;
          }
        },
        showSelectAllCheckbox: false,
        showTextRowsSelected: false,
        search: false,
        sorting: false,
        paging: true,
        draggable: false,
        pageSize: 5,
      }}
    />
  );
};

export default BillingFees;
