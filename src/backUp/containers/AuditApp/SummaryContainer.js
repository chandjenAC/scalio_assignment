import React, { useContext, useEffect } from "react";
import { makeStyles, Fade, Paper, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import RecentActivityContainer from "./RecentActivityContainer";
import YogiRecsContainer from "./YogiRecsContainer";
import KpisAndTrendsContainer from "./KpisAndTrendsContainer";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    background: "transparent",
  },
  dashboardRoot: {
    height: "100%",
  },
  summary: {
    flex: "1 1 auto",
    width: "100%",
  },
  summaryRoot: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr auto",
    gridTemplateAreas:
      "'kpisCont kpisCont' 'trendsCont yogiRecs' 'trendsCont yogiRecs'",
  },
  kpisCont: {
    gridArea: "kpisCont",
    paddingBottom: "16px",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
  },
  trendsCont: { gridArea: "trendsCont", padding: "10px 20px 6px 36px" },
  yogiRecs: {
    gridArea: "yogiRecs",
    padding: "10px 36px 6px 8px",
  },
}));

const SummaryContainer = (props) => {
  const { resource } = props;
  const classes = useStyles();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "AUDIT", "Audit"),
        path: "yogi-webb/audit",
      },
    ]);
  }, []);

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        <Grid container direction="column" className={classes.dashboardRoot}>
          <Grid item className={classes.summary}>
            <div className={classes.summaryRoot}>
              <div className={classes.kpisCont}>
                <KpisAndTrendsContainer resource={resource} />
              </div>
              <div className={classes.trendsCont}>
                <RecentActivityContainer resource={resource} />
              </div>
              <div className={classes.yogiRecs}>
                <YogiRecsContainer resource={resource} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default SummaryContainer;
