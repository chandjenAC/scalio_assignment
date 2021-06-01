import React, { useState } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import ScrollableDialogBox from "../molecules/DialogBox/ScrollableDialogBox";
import resource from "../../../resources/common.json";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
  },
}));

const MulitlineEditInDialogBox = (props) => {
  const { multilineText, label, buttonText, title } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleClose,
    },
  ];

  return (
    <>
      <Button className={classes.button} onClick={(e) => handleOpen(e)}>
        {buttonText}
      </Button>
      <ScrollableDialogBox
        open={open}
        handleClose={handleClose}
        title={title}
        dialogActions={dialogActions}
      >
        <TextField
          style={{ minWidth: 500 }}
          label={label}
          multiline
          value={multilineText}
          onChange={(e) => {
            let newValue = JSON.parse(JSON.stringify(e.target.value));
            props.onChange(newValue);
          }}
        />
      </ScrollableDialogBox>
    </>
  );
};

export default MulitlineEditInDialogBox;
