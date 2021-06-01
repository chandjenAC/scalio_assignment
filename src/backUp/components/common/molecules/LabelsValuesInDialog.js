import { Grid, Typography } from "@material-ui/core";
import React from "react";

const dialogGridContainerStyle = { flexWrap: "noWrap" };

const LabelsValuesInDialog = ({ data }) => {
  return (
    <Grid
      container
      direction="column"
      style={dialogGridContainerStyle}
      spacing={1}
    >
      {data.map((item, index) => {
        return item.value ? (
          <Grid item key={index}>
            <Grid container alignItems="flex-start">
              <Grid item xs={12} sm={6} md={5} lg={5}>
                <Typography variant="body2" color="textSecondary">
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7} lg={7}>
                <Typography variant="subtitle2">{item.value}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
};

export default LabelsValuesInDialog;
