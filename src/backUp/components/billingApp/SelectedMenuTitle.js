import React from "react";
import StyledSelect from "../common/molecules/StyledSelect";
import { Grid, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const SelectedMenuTitle = (props) => {
  const { resource, menuTitle, hideCcyFilter, showNetworkOperator } = props;

  const parnterOptions = [{ label: "Partner1", value: "Partner1" }];
  const networkOperatorOptions = [{ label: "Operator1", value: "Operator1" }];

  const options = showNetworkOperator ? networkOperatorOptions : parnterOptions;
  const label = showNetworkOperator
    ? getResourceValueByKey(resource, "NETWORK_OPERATOR", "Network Operator")
    : getResourceValueByKey(resource, "CHOOSE_PARTNER", "Choose Partner");

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
    >
      <Grid item>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {menuTitle}
            </Typography>
          </Grid>
          <Grid item>
            <StyledSelect
              minWidth={80}
              options={[{ label: "Admin", value: "Admin" }]}
              defaultValue="Admin"
            />
          </Grid>
          {!hideCcyFilter && (
            <Grid item>
              <StyledSelect
                minWidth={80}
                options={[{ label: "All CCY", value: "All CCY" }]}
                defaultValue="All CCY"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <StyledSelect
          variant="outlined"
          minWidth={180}
          label={label}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default SelectedMenuTitle;
