import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import LabelsValuesInDialog from "../common/molecules/LabelsValuesInDialog";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
    fontWeight: 400,
  },
}));

const ViewBankCodes = (props) => {
  const { resource, rowData } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const onButtonClick = (e) => {
    e.stopPropagation();
    handleOpen(e);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleClose,
    },
  ];

  return (
    <>
      <Button className={classes.button} onClick={(e) => onButtonClick(e)}>
        {getResourceValueByKey(resource, "VIEW", "View")}
      </Button>

      <DialogBox
        open={open}
        showTitleDivider={true}
        handleClose={handleClose}
        dialogActions={dialogActions}
        title={getResourceValueByKey(resource, "BANK_CODES", "Bank Codes")}
      >
        <LabelsValuesInDialog
          data={[
            {
              label: getResourceValueByKey(resource, "IBAN_ID", "IBAN ID"),
              value: rowData.ibanId,
            },
            {
              label: getResourceValueByKey(resource, "CHIPS_ID", "CHIPS ID"),
              value: rowData.chipsId,
            },
            {
              label: getResourceValueByKey(resource, "SWIFT_ID", "SWIFT_ID"),
              value: rowData.swiftId,
            },
            {
              label: getResourceValueByKey(resource, "IFSC_CODE", "IFSC Code"),
              value: rowData.ifscCode,
            },
            {
              label: getResourceValueByKey(resource, "MICR_CODE", "MICR Code"),
              value: rowData.micrCode,
            },
            {
              label: getResourceValueByKey(resource, "BBAN_ID", "BBAN ID"),
              value: rowData.bbanId,
            },
          ]}
        />
      </DialogBox>
    </>
  );
};

export default ViewBankCodes;
