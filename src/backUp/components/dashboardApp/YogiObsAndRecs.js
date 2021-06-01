import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Divider } from "@material-ui/core";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
// import ViewIcon from "@material-ui/icons/VisibilityOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ExclamationIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: "transparent",
    padding: "6px 12px",
    borderRadius: "10px",
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(74, 76, 81, 0.43)",
  },
  cardContent: {
    padding: 10,
    "&:last-child": {
      paddingBottom: 12,
    },
  },
  iconButton: { padding: 0 },
  icon: {
    color: theme.palette.common.white,
  },
  recsContBox: {
    maxHeight: "351px",
    overflowY: "scroll",
    [theme.breakpoints.down("lg")]: {
      maxHeight: "412px",
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: "670px",
    },
  },
  contentBoxWrapper: {
    position: "relative",
    paddingBottom: 10,
  },
  recButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
    zIndex: 2,
    padding: "4px 16px",
  },
  contentBox: {
    position: "relative",
    padding: "6px 8px 16px 18px",
    margin: "10px 6px 10px 0px",
    borderRadius: "5px",
    backgroundColor: theme.palette.common.black,
    zIndex: 1,
  },
  displayName: {
    marginBottom: 2,
    color: theme.palette.primary.main,
    textAlign: "left",
  },
  titleDivider: {
    background: theme.palette.common.white,
    margin: "5px 0px 16px 0px",
  },
  ideaDivider: {
    background: theme.palette.grey[500],
    margin: "5px 0px 5px 0px",
  },
  title: {
    color: theme.palette.common.white,
  },
  contentTitle: {
    color: theme.palette.common.white,
    padding: "4px 0px",
    fontWeight: 400,
  },
  recommendationText: {
    color: theme.palette.common.white,
    fontWeight: 300,
  },
}));

const YogiObsAndRecs = (props) => {
  const { resource, recommendations, observations } = props;
  const classes = useStyles();

  const renderObsAndRecs = (data, flag, index) => {
    return (
      <Box key={index} className={classes.contentBoxWrapper}>
        {flag.recommendation && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.recButton}
          >
            {getResourceValueByKey(resource, "LEARN_MORE..", "Learn more..")}
          </Button>
        )}
        <Box className={classes.contentBox}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography
                className={classes.displayName}
                variant="body2"
                align="left"
                className={classes.contentTitle}
              >
                {data.displayName}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton className={classes.iconButton}>
                <Tooltip
                  title={getResourceValueByKey(
                    resource,
                    "FEEDBACK",
                    "Feedback"
                  )}
                >
                  <ExclamationIcon className={classes.icon} />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
          {/* <Divider classes={{ root: classes.ideaDivider }} /> */}
          <Typography
            variant="body2"
            align="left"
            color="textSecondary"
            className={classes.recommendationText}
          >
            {data.displayInfo.primaryText}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.cardContent }}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="body1" align="left" className={classes.title}>
              {getResourceValueByKey(
                resource,
                "YOGI_OBSERVATIONS_AND_RECOMMENDATIONS",
                "Yogi Observations and Recommendations"
              )}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.iconButton}>
              <Tooltip
                title={getResourceValueByKey(resource, "SETTINGS", "Settings")}
              >
                <SettingsIcon className={classes.icon} />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>

        <Divider classes={{ root: classes.titleDivider }} />
        <Box className={classes.recsContBox}>
          {observations &&
            observations.map((observation, index) => {
              return renderObsAndRecs(
                observation,
                { observation: true },
                index
              );
            })}
          {recommendations &&
            recommendations.map((recommendation, index) => {
              return renderObsAndRecs(
                recommendation,
                { recommendation: true },
                index
              );
            })}
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default YogiObsAndRecs;
