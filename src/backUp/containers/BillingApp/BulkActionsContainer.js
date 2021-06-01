import React, { useState } from "react";
import { useMutation } from "react-query";
import Loader from "../../components/common/atoms/Loaders/Loader";
import DialogBox from "../../components/common/molecules/DialogBox/DialogBox";
import StyledSelect from "../../components/common/molecules/StyledSelect";
import { excludeBillingActivity } from "../../utils/getData";
import { includeBillingActivity } from "../../utils/getData";
import { recalculateBillingFee } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  label: { fontSize: "0.875rem", lineHeight: 1 },
  labelSpan: {
    color: "#2574fb",
    lineHeight: "1 !important",
  },
}));

const BulkActionsContainer = (props) => {
  const {
    resource,
    selectedRows,
    distinctSelectedRows,
    setSelectedRows,
    setDistinctSelectedRows,
    handleReloadTable,
    refetchBillingSummary,
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [resetBulkActionValue, setResetBulkActionValue] = useState(null);
  const [bulkActionError, setBulkActionError] = useState(false);

  const [excludeActivities, excludeStatus] = useMutation(
    excludeBillingActivity,
    {
      onSuccess: (response) => {
        onMutationSuccess(response);
      },
    }
  );

  const [includeActivities, includeStatus] = useMutation(
    includeBillingActivity,
    {
      onSuccess: (response) => {
        onMutationSuccess(response);
      },
    }
  );

  const [recalculateFee, recalculateStatus] = useMutation(
    recalculateBillingFee,
    {
      onSuccess: (response) => {
        refetchBillingSummary();
        onMutationSuccess(response);
      },
    }
  );

  const onMutationSuccess = (response) => {
    renderSnackbar(enqueueSnackbar, response);
    setDistinctSelectedRows(new Set());
    setSelectedRows({});
    handleResetBulkActionValue();
    handleReloadTable();
  };

  const bulkActionOptions = [
    {
      label: getResourceValueByKey(resource, "EXCLUDE", "Exclude"),
      value: "Exclude",
    },
    {
      label: getResourceValueByKey(resource, "INCLUDE", "Include"),
      value: "Include",
    },
    {
      label: getResourceValueByKey(
        resource,
        "RECALCULATE_FEE",
        "Recalculate Fee"
      ),
      value: "Recalculate Fee",
    },
  ];

  const handleResetBulkActionValue = () => {
    if (resetBulkActionValue === null) {
      setResetBulkActionValue(true);
    } else {
      setResetBulkActionValue(!resetBulkActionValue);
    }
  };

  const removeMtableObj = (selectedRows) => {
    let selectedRowsClone = cloneDeep(selectedRows);
    let rows = [];
    Object.keys(selectedRowsClone).forEach((key) => {
      selectedRowsClone[key].forEach((activity) => {
        delete activity.tableData;
        rows.push(activity);
      });
    });
    return rows;
  };

  const handleChangeBulkAction = (action) => {
    if (!isEmpty(selectedRows)) {
      const updatedRows = removeMtableObj(selectedRows);
      if (action === "Exclude") {
        excludeActivities(updatedRows);
      } else if (action === "Include") {
        includeActivities(updatedRows);
      } else if (action === "Recalculate Fee") {
        recalculateFee(updatedRows);
      }
    } else {
      setBulkActionError(true);
      handleResetBulkActionValue();
    }
  };

  const handleCloseBulkActionError = () => {
    setBulkActionError(false);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleCloseBulkActionError,
    },
  ];

  return (
    <>
      {(includeStatus.isLoading ||
        excludeStatus.isLoading ||
        recalculateStatus.isLoading) && (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      )}
      <StyledSelect
        variant="outlined"
        minWidth={distinctSelectedRows.size > 0 ? 200 : 120}
        label={
          distinctSelectedRows?.size > 0 ? (
            <Typography className={classes.label}>
              {getResourceValueByKey(resource, "BULK_ACTIONS", "Bulk Actions")}{" "}
              <span className={classes.labelSpan}>
                {`(${distinctSelectedRows.size} selected)`}
              </span>
            </Typography>
          ) : (
            getResourceValueByKey(resource, "BULK_ACTIONS", "Bulk Actions")
          )
        }
        // disabled={distinctSelectedRows.size === 0}
        options={bulkActionOptions}
        handleChange={handleChangeBulkAction}
        resetValue={resetBulkActionValue}
      />
      {bulkActionError && (
        <DialogBox
          open={bulkActionError}
          handleClose={handleCloseBulkActionError}
          dialogActions={dialogActions}
          title={getResourceValueByKey(resource, "ERROR", "Error")}
        >
          {getResourceValueByKey(
            resource,
            "PLEASE_SELECT_ATLEAST_ONE_ROW_TO_PERFORM_BULK_ACTION!",
            "Please select atleast one row to perform bulk action!"
          )}
        </DialogBox>
      )}
    </>
  );
};

export default BulkActionsContainer;
