import React, { useState } from "react";
import ScrollableDialogBox from "../molecules/DialogBox/ScrollableDialogBox";
import resource from "../../../resources/common.json";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import { Button, makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
  },
  gridContainer: {
    position: "relative",
    padding: 6,
    maxWidth: 950,
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justify: "center",
    minWidth: 250,
    padding: 0,
  },
}));

const RenderArrayInDialogBox = (props) => {
  const { array, buttonText, title } = props;
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
      {array?.length > 0 ? (
        <Button className={classes.button} onClick={(e) => onButtonClick(e)}>
          {buttonText}
        </Button>
      ) : (
        <Typography variant="body2" color="error">
          {buttonText}
        </Typography>
      )}
      <ScrollableDialogBox
        open={open}
        handleClose={handleClose}
        title={title}
        dialogActions={dialogActions}
      >
        <Grid container className={classes.gridContainer}>
          {array?.map((value, index) => {
            return (
              <Grid item key={index} className={classes.gridItem}>
                <Typography variant="body2">
                  {`${index + 1}. ${value}`}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </ScrollableDialogBox>
    </>
  );
};

export default RenderArrayInDialogBox;
