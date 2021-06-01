import React, { useState } from "react";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { IconButton, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogBox from "../common/molecules/DialogBox/DialogBox";

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    // minWidth: 275,
    // maxWidth: 450,
    overflowX: "scroll",
    padding: "16px",
  },
}));

const MoreStatementActions = (props) => {
  const {
    resource,
    rowData,
    retrieveStatementDetails,
    approveFn,
    markAsPastDueFn,
    printSummaryDetails,
  } = props;

  const { status, statementDocURL } = rowData;
  const classes = useStyles();

  const [viewConfirmApproveDialog, setViewConfirmApproveDialog] = useState(
    false
  );
  const [viewMarkAsPastDueDialog, setViewMarkAsPastDueDialog] = useState(false);
  const [
    viewPrintSummaryDetaisError,
    setViewPrintSummaryDetailsError,
  ] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  let defaultOptions = [
    { label: getResourceValueByKey(resource, "VIEW", "View"), value: "view" },
    {
      label: getResourceValueByKey(
        resource,
        "PRINT_SUMMARY_ONLY",
        "Print Summary Only"
      ),
      value: "printSummaryOnly",
    },
    {
      label: getResourceValueByKey(
        resource,
        "PRINT_SUMMARY_+_DETAILS",
        "Print Summary + Details"
      ),
      value: "printSummaryPlusDetails",
    },
    {
      label: getResourceValueByKey(resource, "PROFILE", "Profile"),
      value: "profile",
    },
  ];

  const getActionByStatus = () => {
    return status === "New"
      ? {
          label: getResourceValueByKey(resource, "APPROVE", "Approve"),
          value: "approve",
        }
      : status === "Sent"
      ? {
          label: getResourceValueByKey(
            resource,
            "MARK_AS_PAST_DUE",
            "Mark as Past Due"
          ),
          value: "markAsPastDue",
        }
      : null;
  };

  const getOptionsByStatus = () => {
    const action = getActionByStatus();
    if (action) {
      defaultOptions = [...defaultOptions, ...[action]];
    }
    return defaultOptions;
  };

  const handleMenuItemClick = (event, index) => {
    if (defaultOptions[index].value === "view") {
      retrieveStatementDetails(rowData);
    } else if (defaultOptions[index].value === "approve") {
      setViewConfirmApproveDialog(true);
    } else if (defaultOptions[index].value === "markAsPastDue") {
      setViewMarkAsPastDueDialog(true);
    } else if (defaultOptions[index].value === "printSummaryPlusDetails") {
      if (!statementDocURL) {
        setViewPrintSummaryDetailsError(true);
      } else {
        printSummaryDetails();
      }
    }
    handleCloseMenu();
  };

  const ifDisabled = (index) => {
    if ([1, 3].includes(index)) {
      return true;
    }
    return false;
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMoreActionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseConfirmApproveDialog = (e) => {
    e.stopPropagation();
    setViewConfirmApproveDialog(false);
  };

  const handleCloseMarkAsPastDueDialog = (e) => {
    e.stopPropagation();
    setViewMarkAsPastDueDialog(false);
  };

  const handleClosePrintSummaryDetailsErrorDialog = (e) => {
    e.stopPropagation();
    setViewPrintSummaryDetailsError(false);
  };

  const approveDialogActions = [
    {
      text: getResourceValueByKey(resource, "APPROVE", "Approve"),
      handler: approveFn,
    },
  ];

  const markAsPastDueDialogActions = [
    {
      text: getResourceValueByKey(resource, "CONFIRM", "Confirm"),
      handler: markAsPastDueFn,
    },
  ];

  const printSummaryDetailsDialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleClosePrintSummaryDetailsErrorDialog,
    },
  ];

  return (
    <>
      <Tooltip
        title={getResourceValueByKey(resource, "MORE_ACTIONS", "More Actions")}
      >
        <IconButton
          className={classes.iconButton}
          onClick={handleMoreActionsClick}
        >
          <MoreVertIcon color="disabled" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {getOptionsByStatus().map((option, index) => (
          <MenuItem
            key={option.value}
            disabled={ifDisabled(index)}
            //   selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <DialogBox
        open={viewConfirmApproveDialog}
        handleClose={handleCloseConfirmApproveDialog}
        dialogActions={approveDialogActions}
        title={getResourceValueByKey(
          resource,
          "CONFIRM_APPROVE_STATEMENT",
          "Confirm Approve Statement"
        )}
      >
        {getResourceValueByKey(
          resource,
          "PLEASE_CLICK_ON_APPROVE_TO_CONFIRM_STATEMENT_APPROVAL",
          "Please click on Approve to Confirm Statement Approval"
        )}
      </DialogBox>
      <DialogBox
        open={viewMarkAsPastDueDialog}
        handleClose={handleCloseMarkAsPastDueDialog}
        dialogActions={markAsPastDueDialogActions}
        title={getResourceValueByKey(
          resource,
          "CONFIRM_MARK_AS_PAST_DUE",
          "Confirm Mark as Past Due"
        )}
      >
        {getResourceValueByKey(
          resource,
          "PLEASE_CLICK_ON_CONFIRM_TO_MARK_STATEMENT_AS_PAST_DUE",
          "Please click on Confirm to mark Statement as Past Due"
        )}
      </DialogBox>
      <DialogBox
        open={viewPrintSummaryDetaisError}
        handleClose={handleClosePrintSummaryDetailsErrorDialog}
        dialogActions={printSummaryDetailsDialogActions}
        title={getResourceValueByKey(
          resource,
          "SOMETHING_WENT_WRONG",
          "Something went wrong"
        )}
      >
        {getResourceValueByKey(
          resource,
          "REPORT_COULD_NOT_BE_GENERATED!",
          "Report could not be generated!"
        )}
      </DialogBox>
    </>
  );
};

export default MoreStatementActions;
