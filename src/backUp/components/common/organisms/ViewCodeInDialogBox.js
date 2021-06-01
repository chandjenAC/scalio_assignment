import React, { useState } from "react";
import ScrollableDialogBox from "../molecules/DialogBox/ScrollableDialogBox";
import { Button, makeStyles, Typography } from "@material-ui/core";
import resource from "../../../resources/common.json";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
  },
}));

const ViewCodeInDialogBox = (props) => {
  const { code, buttonText, title } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let splitted = code?.split(";");

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
      <Button className={classes.button} onClick={(e) => handleOpen(e)}>
        {buttonText}
      </Button>
      <ScrollableDialogBox
        open={open}
        handleClose={handleClose}
        title={title}
        dialogActions={dialogActions}
      >
        <div style={{ minWidth: 500 }}>
          {splitted && splitted.length > 0 ? (
            splitted.map((i, key) => {
              return (
                <div key={key}>
                  {key === splitted.length - 1 ? `${i}` : `${i};`}
                </div>
              );
            })
          ) : (
            <Typography variant="body2" align="center">
              {getResourceValueByKey(
                resource,
                "NO_INFO_AVAILABLE!",
                "No info available!"
              )}
            </Typography>
          )}
        </div>
      </ScrollableDialogBox>
    </>
  );
};

export default ViewCodeInDialogBox;
