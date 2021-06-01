import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import resource from "../resources/common.json";
import { getResourceValueByKey } from "../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  errorMsg: {
    paddingTop: 12,
    maxWidth: "85vh",
    overflow: "scroll",
  },
}));

const Fallback = ({ error, resetErrorBoundary }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h2">
        {getResourceValueByKey(
          resource,
          "OOPS!_SOMETHING_WENT_WRONG",
          "Oops! Something went wrong!"
        )}
      </Typography>
      <pre className={classes.errorMsg}>{error?.message}</pre>
      <Button onClick={resetErrorBoundary} color="primary" variant="contained">
        {getResourceValueByKey(resource, "GO_BACK_HOME", "Go back Home")}
      </Button>
    </div>
  );
};

export default Fallback;
