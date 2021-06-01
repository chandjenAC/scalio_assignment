import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  column3: { textAlign: "left" },
}));

const TableRow = ({ column1, column2, column3 }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justify="flex-start" spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        {column1}
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        {column2}
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3} className={classes.column3}>
        {column3}
      </Grid>
    </Grid>
  );
};

export default TableRow;
