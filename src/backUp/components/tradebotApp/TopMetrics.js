import React, { forwardRef } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles, Tooltip } from "@material-ui/core";
import capitalize from "lodash/capitalize";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 0px 0px 0px",
    },
  },
  box: {
    padding: "0px 8px",
  },
  rectangleContainer: {
    margin: "4px 4px 0px 0px",
  },
  rectangle: {
    display: "grid",
    placeItems: "center",
    width: "44px",
    height: "24px",
    borderRadius: "5px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    verticalAlign: "middle",
  },
}));

const TopMetrics = (props) => {
  const { metricsData } = props;

  const classes = useStyles();

  const SubTypeCounts = forwardRef((props, ref) => {
    return (
      <div className={classes.rectangle} ref={ref}>
        <Typography variant="body2">{props.subType.tokenCount}</Typography>
      </div>
    );
  });

  return (
    <Grid container className={classes.root} justify="space-between">
      {metricsData &&
        metricsData.map((token, index) => {
          return (
            <Box key={index} className={classes.box}>
              <Typography
                variant="body2"
                align="left"
                color={"primary"}
              >{`${capitalize(token.tokenType)}s`}</Typography>
              <Grid container justify="flex-start">
                {token.subTypes.map((subType, index) => {
                  return (
                    <Grid
                      item
                      key={index}
                      className={classes.rectangleContainer}
                    >
                      <Tooltip title={subType.name} placement="bottom">
                        <SubTypeCounts subType={subType} index={index} />
                      </Tooltip>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          );
        })}
    </Grid>
  );
};

export default TopMetrics;
