import React from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useStyles } from "./useStyles";
import DialogBoxTitle from "./DialogBoxTitle";

const DialogBox = (props) => {
  const {
    open,
    handleClose,
    dialogActions,
    title,
    children,
    fullScreen,
    showTitleDivider,
  } = props;
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
      <DialogTitle disableTypography className={classes.root}>
        <DialogBoxTitle
          title={title}
          showTitleDivider={showTitleDivider}
          handleClose={handleClose}
        />
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        {children}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        {dialogActions?.map((action, index) => {
          return (
            <Button
              autoFocus
              key={index}
              disabled={action.disable}
              onClick={action.handler}
              color="primary"
            >
              {action.text}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
