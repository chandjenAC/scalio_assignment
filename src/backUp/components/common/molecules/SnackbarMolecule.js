import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const SnackbarMolecule = (props) => {
  const { open, message, severity, handleClose } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMolecule;
