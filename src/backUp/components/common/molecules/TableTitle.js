import React from "react";
import { Grid, Typography } from "@material-ui/core";

const TableTitle = ({ columnTitle1, columnTitle2, columnTitle3 }) => {
  return (
    <Grid container alignItems="center" justify="flex-start" spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Grid container>
          <Grid item sm={2} md={2} lg={2}></Grid>
          <Grid item sm={10} md={10} lg={10}>
            <Typography variant="subtitle2" color="textSecondary" align="left">
              {columnTitle1}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          {columnTitle2}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          {columnTitle3}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TableTitle;
