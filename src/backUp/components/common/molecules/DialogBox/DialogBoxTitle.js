import React from "react";
import { Divider, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./useStyles";

const DialogBoxTitle = (props) => {
  const { title, showTitleDivider, handleClose } = props;
  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="subtitle1">{title}</Typography>
          </Grid>
          {showTitleDivider && (
            <Grid item>
              <Divider className={classes.divider} />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        {handleClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default DialogBoxTitle;
