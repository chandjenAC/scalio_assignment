import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Loader from "../../components/common/atoms/Loaders/Loader";
import FeeSummary from "../../components/billingApp/FeeSummary";
import ActivityTableContainer from "./ActivityTableContainer";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import cloneDeep from "lodash/cloneDeep";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const ActivityByTxnTypeSummary = (props) => {
  const {
    resource,
    loadingFeeSummary,
    feeSummaryData,
    handleReloadTable,
    reloadTable,
    criteriaApplied,
    statementId,
    activeFilters,
    refetchBillingSummary,
    selectedRows,
    handleSelectRows,
  } = props;

  const [viewActivityGridByIndex, setViewActivityGridByIndex] = useState([]);

  const classes = useStyles();

  const handleExpandIconClick = (index) => {
    let copy = cloneDeep(viewActivityGridByIndex);
    let temp = [...copy];
    if (viewActivityGridByIndex.includes(index)) {
      let removeIndex = viewActivityGridByIndex.indexOf(index);
      temp.splice(removeIndex, 1);
    } else {
      temp.push(index);
    }
    setViewActivityGridByIndex(temp);
  };

  const getTxnTypeText = (txnType) => {
    switch (txnType) {
      case "COB":
        return getResourceValueByKey(resource, "ONBOARDING", "Onboarding");
      case "EP":
        return getResourceValueByKey(
          resource,
          "EARLY_PAYMENT",
          "Early Payment"
        );
      case "APF":
        return getResourceValueByKey(
          resource,
          "APPROVED_PAYABLES_FINANCE",
          "Approved Payables Finance"
        );
      case "APD":
        return getResourceValueByKey(
          resource,
          "APPROVED_PAYABLES_DRAFT",
          "Approved Payables Draft"
        );
      case "CAPD":
        return getResourceValueByKey(
          resource,
          "CUSTOMER_APPROVED_PAYABLES_DRAFT",
          "Customer Approved Payable Drafts"
        );
      case "BAPD":
        return getResourceValueByKey(
          resource,
          "BANK_APPROVED_PAYABLES_DRAFT",
          "Bank Approved Payable Drafts"
        );
      case "COMPL-KYB":
        return getResourceValueByKey(resource, "COMPL-KYB", "COMPL-KYB");
      case "COMPL-KYC":
        return getResourceValueByKey(resource, "COMPL-KYC", "COMPL-KYC");
      default:
        break;
    }
  };

  return loadingFeeSummary ? (
    <div className={classes.centerDiv}>
      <Loader />
    </div>
  ) : feeSummaryData?.data?.length > 0 ? (
    feeSummaryData.data.map((item, index) => {
      return (
        <Grid container direction="column" key={index}>
          <Grid item>
            <FeeSummary
              item={item}
              index={index}
              getTxnTypeText={getTxnTypeText}
              handleExpandIconClick={handleExpandIconClick}
            />
          </Grid>
          {viewActivityGridByIndex.includes(index) && (
            <Grid item>
              <ActivityTableContainer
                resource={resource}
                txnType={item.txnType}
                criteriaApplied={criteriaApplied}
                statementId={statementId}
                activeFilters={activeFilters}
                reloadTable={reloadTable}
                handleReloadTable={handleReloadTable}
                refetchBillingSummary={refetchBillingSummary}
                selectedRows={selectedRows}
                handleSelectRows={handleSelectRows}
              />
            </Grid>
          )}
        </Grid>
      );
    })
  ) : (
    <Typography variant="h6" color="error">
      {getResourceValueByKey(resource, "NO_ACTIVITY", "No Activity")}
    </Typography>
  );
};

export default ActivityByTxnTypeSummary;
