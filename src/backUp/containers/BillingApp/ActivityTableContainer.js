import React from "react";
import BillingFees from "../../components/billingApp/BillingFees";
import { Paper, Fade, makeStyles } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import FormatDate from "../../components/common/FormatDate";
import { formatAmount } from "../../utils";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import AmountWithCcy from "../../components/common/molecules/AmountWithCcy";
import FeeStatusTags from "../../components/billingApp/FeeStatusTags";
import ActivityActionsContainer from "./ActivityActionsContainer";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    borderRadius: "25px 0px 0px 0px",
  },
}));

const ActivityTableContainer = (props) => {
  const {
    resource,
    criteriaApplied,
    txnType,
    statementId,
    activeFilters,
    reloadTable,
    handleReloadTable,
    selectedRows,
    handleSelectRows,
    // refetchBillingSummary,
  } = props;

  const classes = useStyles();

  const columns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),

      width: 60,
    },
    {
      field: "txnInfo.txnDatet",
      title: getResourceValueByKey(resource, "DATE", "Date"),
      render: (rowData) => (
        <FormatDate
          currentFormat={"yyyymmdd"}
          date={rowData?.txnInfo?.txnDate}
          padding="0px"
        />
      ),
      type: "datetime",
    },
    {
      field: "txnInfo.reference",
      title: getResourceValueByKey(
        resource,
        "TRANSACTION_REF",
        "Transaction Ref"
      ),
    },
    {
      field: "txnInfo.txnType",
      title: getResourceValueByKey(resource, "PROGRAM_TYPE", "Program Type"),
    },
    {
      field: "txnInfo.txnEvent",
      title: getResourceValueByKey(resource, "FEE_TYPE", "Fee Type"),
    },
    {
      field: "feeCharged",
      title: getResourceValueByKey(resource, "FEE_CHARGED", "Fee Charged"),
      render: (rowData) => {
        return (
          <AmountWithCcy
            amount={formatAmount(rowData.txnInfo.incomeAmount.value)}
            ccy={rowData.txnInfo.incomeAmount.ccy}
          />
        );
      },
      align: "right",
    },
    {
      field: "calculationInfo.calType",
      title: getResourceValueByKey(resource, "CALC._TYPE", "Calc. Type"),
      // hidden: (rowData) => rowData.status === "New",
    },
    {
      field: "billAmount",
      title: getResourceValueByKey(resource, "BILL_AMOUNT", "Bill Amount"),
      render: (rowData) => {
        return (
          <AmountWithCcy
            amount={
              rowData.calculationInfo?.calFeeAmount
                ? formatAmount(rowData.calculationInfo?.calFeeAmount)
                : "0.00"
            }
            ccy={rowData.calculationInfo?.calFeeCcy}
          />
        );
      },
      align: "right",
      // hidden: (rowData) => (rowData.status === "New" ? true : false),
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "TAGS", "Tags"),
      render: (rowData) => (
        <FeeStatusTags resource={resource} status={rowData.status} />
      ),
    },
    {
      field: "actions",
      title: getResourceValueByKey(resource, "", ""),
      render: (rowData) => (
        <ActivityActionsContainer
          resource={resource}
          rowData={rowData}
          handleReloadTable={handleReloadTable}
        />
      ),
      width: 125,
    },
  ];

  const getBillingFees = (query) => {
    let filters = [];
    if (activeFilters.defaultFlag) {
      //remove txnType filter from filters in criteriaApplied as the txnType filter value is taken from the mapping.
      const filtered = criteriaApplied.filters.filter(
        (x) => x.fieldName !== "txnInfo.txnType"
      );
      filters = filtered;
    } else {
      if (statementId) {
        filters.push({
          fieldName: "invoiceInfo.statementId",
          operator: "eq",
          values: [statementId],
        });
      }
      if (activeFilters.client.value) {
        filters.push({
          fieldName: "customerTopId",
          operator: "eq",
          values: [activeFilters.client.value],
        });
      }
      if (activeFilters.txnDate.gte && activeFilters.txnDate.lte) {
        filters.push({
          fieldName: "txnInfo.txnDate",
          operator: "range",
          values: [activeFilters.txnDate.gte, activeFilters.txnDate.lte],
        });
      }
      if (activeFilters.status.length > 0) {
        filters.push({
          fieldName: "status",
          operator: "in",
          values: activeFilters.status,
        });
      }
    }
    if (txnType) {
      filters.push({
        fieldName: "txnInfo.txnType",
        operator: "eq",
        values: [txnType],
      });
    }

    let sort = [
      { fieldName: "txnInfo_txnDate", sortOrder: "DESC" },
      { fieldName: "updatedInfo_updatedOn", sortOrder: "DESC" },
    ];
    let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
    let body = getFilterSortPaginate(filters, sort, paging);

    return new Promise((resolve, reject) => {
      post(env.SEARCH_BILLING_FEE, body).then((result) => {
        if (result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
          });
        }
      });
    });
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        <BillingFees
          txnType={txnType}
          columns={columns}
          getBillingFees={getBillingFees}
          selectedRows={selectedRows}
          reloadTable={reloadTable}
          handleSelectRows={handleSelectRows}
        />
      </Paper>
    </Fade>
  );
};

export default ActivityTableContainer;
