import React from "react";
import NotificationIcon from "@material-ui/icons/Notifications";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";

const useStyles = makeStyles((theme) => ({
  gridCont: { flexWrap: "noWrap" },
  margin6: {
    margin: 6,
  },
  countDiv: {
    padding: "0px 8px",
    backgroundColor: "#2574fb",
    borderRadius: 4,
  },
  count: {
    color: theme.palette.common.white,
  },
  filterIconDiv: {
    marginLeft: 12,
  },
}));

const NotificationHeader = (props) => {
  const { resource, notificationsCount } = props;

  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      className={classes.gridCont}
      justify="space-between"
    >
      <Grid item className={classes.margin6}>
        <Grid container alignItems="center" className={classes.gridCont}>
          <Grid item item className={classes.margin6}>
            <NotificationIcon color="disabled" />
          </Grid>
          <Grid item item className={classes.margin6}>
            <Typography variant="subtitle1">
              {getResourceValueByKey(
                resource,
                "NOTIFICATIONS",
                "Notifications"
              )}
            </Typography>
          </Grid>
          <Grid item className={classes.countDiv}>
            <Typography variant="subtitle2" className={classes.count}>
              {notificationsCount || 0}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.filterIconDiv}>
        <FilterIcon />
      </Grid>
    </Grid>
  );
};

export default NotificationHeader;
