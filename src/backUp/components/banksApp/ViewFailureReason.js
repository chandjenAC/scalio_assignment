import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import LabelsValuesInDialog from "../common/molecules/LabelsValuesInDialog";

const ViewFailureReason = (props) => {
  const { resource, selectedRow, setViewFailureReason } = props;

  const handleClose = (e) => {
    e.stopPropagation();
    setViewFailureReason(false);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  return (
    <DialogBox
      open={true}
      showTitleDivider={true}
      handleClose={handleClose}
      dialogActions={dialogActions}
      title={getResourceValueByKey(
        resource,
        "REASON_FOR_FAILURE",
        "Reason for Failure"
      )}
    >
      <LabelsValuesInDialog
        data={[
          {
            label: getResourceValueByKey(resource, "REASON", "Reason"),
            value: selectedRow.reason,
          },
        ]}
      />
    </DialogBox>
  );
};

export default ViewFailureReason;
