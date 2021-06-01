import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  clientInfoCont: {
    padding: "24px 0px 12px 8px",
  },
  clientName: {
    fontWeight: 700,
  },
  buttonRoot: {
    marginLeft: 12,
    padding: "6px 16px",
  },
}));

const ClientHeader = (props) => {
  const { resource, clientName, clientTopId, handleClickViewProfile } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.clientInfoCont} alignItems="flex-end">
      <Grid item>
        <Typography variant="h5" className={classes.clientName}>
          {clientName ? clientName : clientTopId}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          classes={{ root: classes.buttonRoot }}
          //   color="primary"
          onClick={handleClickViewProfile}
          variant="outlined"
        >
          {getResourceValueByKey(resource, "VIEW_PROFILE", "View Profile")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ClientHeader;
