import React, { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useStyles } from "./useStyles";
import DialogBoxTitle from "./DialogBoxTitle";

const ScrollableDialogBox = (props) => {
  const {
    open,
    handleClose,
    dialogActions,
    title,
    children,
    showTitleDivider,
  } = props;
  const classes = useStyles();
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} scroll={"paper"}>
      <DialogTitle className={classes.root} disableTypography>
        <DialogBoxTitle
          title={title}
          showTitleDivider={showTitleDivider}
          handleClose={handleClose}
        />
      </DialogTitle>
      <DialogContent
        dividers={true}
        ref={descriptionElementRef}
        classes={{ root: classes.dialogContent }}
      >
        {/* <DialogContentText
          ref={descriptionElementRef}
          variant="body2"
          tabIndex={-1}
        > */}
        {children}
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        {dialogActions.map((action, index) => {
          return (
            <Button
              key={index}
              autoFocus
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

export default ScrollableDialogBox;
