import React from "react";
import Rating from "@material-ui/lab/Rating";
import ReactScoreIndicator from "react-score-indicator";
import { scoreIndicatorColors } from "../../utils/constants";
import ScoreGradeText from "../common/ScoreGradeText";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LineChartMolecule from "../common/molecules/Charts/LineChartMolecule";
import { getRechartsData } from "../../utils";

const useStyles = makeStyles((theme) => ({
  reputationContainer: {
    height: "100%",
  },
  mainGridItem: {
    padding: "4px 0px 4px",
  },
  scoreText: {
    margin: "0px 0px 0px 8px",
  },
  rating: {
    margin: "0px 0px 0px 8px",
  },
}));

const TokenReputation = (props) => {
  const { resource, token, tokenType } = props;
  const classes = useStyles();

  const getGraphData = (data) => {
    let lines = [];

    data.map((item) => {
      lines.push({ key: item.name });
    });

    let datapoints = getRechartsData(data);
    return { data: datapoints, lines: lines };
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      className={classes.reputationContainer}
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="subtitle1" color="primary" align="center">
          {getResourceValueByKey(resource, "REPUTATION", "Reputation")}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <ReactScoreIndicator
              value={token ? token[tokenType].scores[0].score : 0}
              width={130}
              maxValue={850}
              stepsColors={scoreIndicatorColors()}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item className={classes.scoreText}>
                <ScoreGradeText scoreData={token && token[tokenType].scores} />
              </Grid>
              <Grid item className={classes.rating}>
                <Rating
                  readOnly
                  precision={0.5}
                  name="Token Rating"
                  value={token?.[tokenType]?.scores?.[0].rating}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {token[tokenType].scores[0].metrics.length > 0 && (
          <LineChartMolecule
            data={getGraphData(token[tokenType].scores[0].metrics)}
            width={"95%"}
            height={350}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TokenReputation;
