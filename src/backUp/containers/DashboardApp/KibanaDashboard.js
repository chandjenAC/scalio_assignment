import React from "react";
import { makeStyles } from "@material-ui/core";
import { env } from "../../ENV";
import kibanaUrlMeta from "../../meta/kibanaUrls.json";

const useStyles = makeStyles((theme) => ({
  dashboardRoot: {
    position: "relative",
    height: "100%",
  },
  iframe: {
    borderRadius: "25px 0px 0px 0px",
    borderWidth: 0,
  },
}));

const KibanaDashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.dashboardRoot}>
      <iframe
        className={classes.iframe}
        src={`${env.KIBANA}${kibanaUrlMeta.dashboardAppSummary}`}
        height="100%"
        width="100%"
      ></iframe>
    </div>
  );
};

export default KibanaDashboard;
