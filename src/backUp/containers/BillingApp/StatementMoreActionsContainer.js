import React from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { renderSnackbar } from "../../utils";
import { approveStatement, markAsPastDue } from "../../utils/getData";
import MoreStatementActions from "../../components/billingApp/MoreStatementActions";
import cloneDeep from "lodash/cloneDeep";
import { viewOrDownloadFile } from "../../utils/viewOrDownloadFile";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const StatementMoreActionsContainer = (props) => {
  const {
    resource,
    rowData,
    handleReloadTable,
    retrieveStatementDetails,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [approveStatementMutation] = useMutation(approveStatement, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleReloadTable();
    },
  });

  const [markAsPastDueMutation] = useMutation(markAsPastDue, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleReloadTable();
    },
  });

  const approveFn = () => {
    approveStatementMutation(rowData.id);
  };

  const markAsPastDueFn = () => {
    let statementData = cloneDeep(rowData);
    statementData.status = "Past Due";
    markAsPastDueMutation(statementData);
  };

  const printSummaryDetails = () => {
    const fileId = rowData?.statementDocURL;
    enqueueSnackbar(
      getResourceValueByKey(
        resource,
        "INITIALIZING_FILE_DOWNLOAD...",
        "Initiating file download..."
      ),
      { variant: "success" }
    );
    viewOrDownloadFile({ id: fileId, viewOrDownloadKey: "view" });
  };

  return (
    <MoreStatementActions
      rowData={rowData}
      resource={resource}
      retrieveStatementDetails={retrieveStatementDetails}
      approveFn={approveFn}
      markAsPastDueFn={markAsPastDueFn}
      printSummaryDetails={printSummaryDetails}
    />
  );
};

export default StatementMoreActionsContainer;
