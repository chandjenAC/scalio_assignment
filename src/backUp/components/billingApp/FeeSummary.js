import React from "react";
import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatAmount } from "../../utils";

const useStyles = makeStyles((theme) => ({
  byTxnTypeCont: {
    padding: 12,
  },
  iconButton: {
    padding: 0,
    background: theme.palette.primary.main,
    marginLeft: 8,
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  icon: {
    fontSize: 18,
    color: theme.palette.common.white,
  },
}));

const FeeSummary = (props) => {
  const { item, index, handleExpandIconClick, getTxnTypeText } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.byTxnTypeCont}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {getTxnTypeText(item.txnType)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              className={classes.iconButton}
              onClick={() => handleExpandIconClick(index)}
            >
              <ExpandMoreIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6">{`${formatAmount(item.billedAmount)} ${
          item.ccy ? item.ccy : ""
        }`}</Typography>
      </Grid>
    </Grid>
  );
};

export default FeeSummary;
