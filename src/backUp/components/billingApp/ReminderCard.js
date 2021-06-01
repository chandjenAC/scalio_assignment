import React from "react";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clientCard: {
    textAlign: "left",
    minWidth: 300,
    // flexGrow: 1,
    margin: "4px 40px 4px 20px",
    borderRadius: 15,
    padding: "20px 40px",
    boxShadow: "2px 3px 10px -3px rgb(0 0 0 / 36%)",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.06)",
      background: "linear-gradient(45deg, #86f249, #fffa61)",
      transition: "all 500ms ease-ou0t",
    },
  },
  bold: {
    fontWeight: 600,
  },
  icon: {
    height: 32,
    width: "auto",
    marginBottom: 12,
    color: "#2574fb",
  },
  divider: {
    margin: "10px 0px",
  },
  caption1: {
    display: "block",
    color: theme.palette.text.secondary,
  },
  caption2: {
    display: "block",
    fontWeight: 600,
  },
}));

const ReminderCard = (props) => {
  const { data, onClick } = props;
  const classes = useStyles();
  const Icon = data.icon;

  return (
    <Paper className={classes.clientCard} onClick={() => onClick(data)}>
      <Grid container justify="space-between">
        <Grid item>
          <Icon className={classes.icon} />
          <Typography variant="subtitle1">{data.title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.bold}>
            {data.count}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" className={classes.divider} />
      <Typography variant="caption" className={classes.caption1}>
        {data.caption1}
      </Typography>
      <Typography variant="caption" className={classes.caption2}>
        {data.caption2}
      </Typography>
    </Paper>
  );
};

export default ReminderCard;
