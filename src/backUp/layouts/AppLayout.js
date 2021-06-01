import React from "react";
import { getResourceValueByKey } from "../utils/resourceHelper";
import resource from "../resources/common.json";
import { makeStyles, Box, Button } from "@material-ui/core";
import { Grid, Tooltip } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import GoBackIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
  appRoot: {
    position: "relative",
    height: "100%",
  },
  scrollContainer: {
    height: "87vh",
    overflowY: "scroll",
    flexWrap: "nowrap",
    padding: "0px 22px 0px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px 0px 30px",
    },
  },
  goBackIconDiv: {
    position: "absolute",
    top: "2.2vh",
    left: -20,
    zIndex: 99,
    [theme.breakpoints.down("sm")]: {
      left: -10,
    },
  },
  goBackButton: {
    padding: 0,
    minWidth: 20,
  },
  goBackIcon: {
    color: theme.palette.grey[800],
    fontSize: 26,
    cursor: "pointer",
  },
  appContainer: {
    maxWidth: "100%",
    flexWrap: "nowrap",
    height: "100%",
  },
}));

const AppLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const renderNavBack = () => {
    let state = location.state;
    let pathname = location.pathname.split("/");
    let goBack = pathname.length >= 4 && pathname[3] !== "";
    if (state?.goBack || goBack) {
      return true;
    }
    return false;
  };

  return (
    <div className={classes.appRoot}>
      {renderNavBack() && (
        <Box className={classes.goBackIconDiv}>
          <Tooltip
            title={getResourceValueByKey(resource, "GO_BACK", "Go back")}
            placement="bottom"
          >
            <Button
              onClick={() => navigate(-1)}
              className={classes.goBackButton}
            >
              <GoBackIcon className={classes.goBackIcon} />
            </Button>
          </Tooltip>
        </Box>
      )}
      <Grid container direction="column" className={classes.scrollContainer}>
        <Grid item className={classes.appContainer}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AppLayout;
