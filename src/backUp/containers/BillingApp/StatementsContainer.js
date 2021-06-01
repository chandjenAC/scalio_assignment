import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Statements from "../../components/billingApp/Statements";
import StatementStatusTags from "../../components/billingApp/StatementStatusTags";
import FormatDate from "../../components/common/FormatDate";
import AmountWithCcy from "../../components/common/molecules/AmountWithCcy";
import { env } from "../../ENV";
import { formatAmount } from "../../utils";
import { post } from "../../utils/callApi";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import StatementActionsContainer from "./StatementActionsContainer";
import StatementMoreActionsContainer from "./StatementMoreActionsContainer";

const StatementsContainer = (props) => {
  const {
    resource,
    clientTopId,
    status,
    reloadTable,
    handleReloadTable,
    viewStatements,
    retrieveStatementDetails,
  } = props;

  const columns = [
    {
      field: "clientInfo",
      title: getResourceValueByKey(
        resource,
        "CLIENT/ACCOUNT_NO.",
        "Client/Account No."
      ),
      render: (rowData) => {
        return (
          <>
            <Typography variant="subtitle2">{rowData.customerName}</Typography>
            <Typography variant="caption" color="textSecondary">
              {rowData.billingDetails?.billingAccount?.accountNumber.replace(
                /.(?=.{4})/g,
                "x"
              )}
            </Typography>
          </>
        );
      },
    },
    {
      field: "statementNumber",
      title: getResourceValueByKey(resource, "ST. NUMBER", "St. Number"),
      render: (rowData) => {
        return (
          <Typography variant="body2" color="textSecondary">
            {rowData.statementNumber}
          </Typography>
        );
      },
    },
    {
      field: "billingPeriod",
      title: getResourceValueByKey(
        resource,
        "BILLING_PERIOD",
        "Billing Period"
      ),
      render: (rowData) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <FormatDate
                currentFormat={"yyyymmdd"}
                date={rowData?.billingPeriodStartDate}
                padding="0px"
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">&nbsp;-&nbsp;</Typography>
            </Grid>
            <Grid item>
              <FormatDate
                currentFormat={"yyyymmdd"}
                date={rowData?.billingPeriodEndDate}
                padding="0px"
              />
            </Grid>
          </Grid>
        );
      },
      type: "datetime",
    },
    {
      field: "invoiceAmount",
      title: getResourceValueByKey(
        resource,
        "STATEMENT_AMOUNT",
        "Statement Amount"
      ),
      render: (rowData) => (
        <AmountWithCcy
          amount={formatAmount(
            rowData?.invoiceAmount?.value || rowData?.invoiceAmount_value
          )}
          ccy={rowData?.invoiceAmount?.ccy || rowData?.invoiceAmount_ccy}
        />
      ),
      align: "right",
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      render: (rowData) => (
        <StatementStatusTags
          resource={resource}
          status={rowData.status}
          paidStatus={rowData.paidStatus}
        />
      ),
    },
    {
      field: "actions",
      title: "",
      render: (rowData) => (
        <StatementActionsContainer
          resource={resource}
          rowData={rowData}
          retrieveStatementDetails={retrieveStatementDetails}
          handleReloadTable={handleReloadTable}
        />
      ),
    },
    {
      field: "",
      title: "",
      render: (rowData) => (
        <StatementMoreActionsContainer
          resource={resource}
          rowData={rowData}
          retrieveStatementDetails={retrieveStatementDetails}
          handleReloadTable={handleReloadTable}
        />
      ),
      align: "right",
      width: 25,
    },
  ];

  const getStatements = (query) => {
    return new Promise((resolve, reject) => {
      let filters = [];
      if (clientTopId) {
        filters.push({
          fieldName: "customerTopId",
          operator: "eq",
          values: [clientTopId],
        });
      }
      if (status) {
        filters.push({
          fieldName: "status",
          operator: "eq",
          values: [status],
        });
      }
      let sort = [{ fieldName: "statementDate", sortOrder: "DESC" }];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filters, sort, paging);
      post(env.SEARCH_BILLING_STATEMENT, body).then((result) => {
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

  const getStatementsPastDue = (query) => {
    return new Promise((resolve, reject) => {
      let filters = [];
      if (clientTopId) {
        filters.push({
          fieldName: "customerTopId",
          operator: "eq",
          values: [clientTopId],
        });
      }
      let sort = [{ fieldName: "statementDate", sortOrder: "DESC" }];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filters, sort, paging);
      post(env.SEARCH_BILLING_STATEMENT_PAST_DUE, body).then((result) => {
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
    <Statements
      resource={resource}
      reloadTable={reloadTable}
      retrieveStatementDetails={retrieveStatementDetails}
      columns={columns}
      data={
        viewStatements === "Past Due" ? getStatementsPastDue : getStatements
      }
    />
  );
};

export default StatementsContainer;
