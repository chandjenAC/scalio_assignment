import React from "react";
import { ReactComponent as AngleDownIcon } from "../../images/common/angleDown.svg";
import { ReactComponent as LayerIcon } from "../../images/common/layerGroup.svg";
import { ReactComponent as CalendarIcon } from "../../images/common/calendar.svg";
import { Grid, IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icons: {
    width: 16,
    height: "auto",
  },
}));

const ActivityIcons = () => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton>
          <AngleDownIcon className={classes.icons} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <LayerIcon className={classes.icons} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <CalendarIcon className={classes.icons} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ActivityIcons;
