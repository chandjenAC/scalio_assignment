import React from "react";
import { Card, Grid, makeStyles } from "@material-ui/core";
import { ReactComponent as ArrowRight } from "../../../images/common/caret-right.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  lhsContainer: {
    height: "100%",
    flexWrap: "noWrap",
  },
  summaryCardGridItem: { position: "relative" },
  summaryCard: {
    // margin: 6,
    width: "96%",
    display: "grid",
    placeItems: "center",
    padding: "12px 20px 12px 12px",
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
    cursor: "pointer",
    minHeight: 65,
    borderRadius: 15,
  },
  detailsCard: {
    display: "flex",
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    height: "100%",
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
    borderRadius: 15,
  },
  iconCont: {
    position: "absolute",
    top: "50%",
    right: "0%",
    transform: "translate(0%, -50%)",
  },
  rightArrow: { width: 25 },
}));

const SummaryCardsWithDetail = (props) => {
  const { meta, selectedKey, onSelect } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.container} spacing={1}>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Grid
          container
          direction="column"
          className={classes.lhsContainer}
          justify="space-between"
        >
          {meta.map((item, index) => {
            return (
              <Grid item className={classes.summaryCardGridItem} key={index}>
                <Card
                  className={classes.summaryCard}
                  selected={item.key === selectedKey}
                  onClick={() => onSelect(item.key)}
                >
                  {item.summaryContent}
                  {item.key === selectedKey && (
                    <div className={classes.iconCont}>
                      <ArrowRight className={classes.rightArrow} />
                    </div>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        {meta.map((item, index) => {
          return (
            item.key === selectedKey && (
              <Card key={index} className={classes.detailsCard}>
                {item.detailsContent}
              </Card>
            )
          );
        })}
      </Grid>
    </Grid>
  );
};

export default SummaryCardsWithDetail;
