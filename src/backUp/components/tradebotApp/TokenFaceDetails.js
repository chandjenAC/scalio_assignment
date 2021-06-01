import React from "react";
import LabelAndValue from "../common/LabelAndValue";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  faceDetailsPaper: {
    padding: "0px 0px 6px 22px",
    margin: "6px",
  },
}));

const TokenFaceDetails = (props) => {
  const { resource, token } = props;
  const classes = useStyles();

  let tokenIdLabel = getResourceValueByKey(resource, "TOKEN_ID", "Token ID");
  let displayIdLabel = getResourceValueByKey(
    resource,
    "DISPLAY_ID",
    "Display ID"
  );
  let tokenPolicyLabel = getResourceValueByKey(
    resource,
    "TOKEN_POLICY",
    "Token Policy"
  );

  const faceDetails = {
    [tokenIdLabel]: token && token.id,
    [displayIdLabel]: token && token.faces[0].displayId,
    [tokenPolicyLabel]: token && token.policy.name,
  };

  return (
    <Paper className={classes.faceDetailsPaper}>
      <Grid container justify="flex-start">
        {Object.keys(faceDetails).map(
          (keyName, i) =>
            faceDetails[keyName] && (
              <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
                <LabelAndValue
                  width="350px"
                  padding={"8px 0px"}
                  labelPadding={"2px 0px"}
                  label={keyName}
                  value={faceDetails[keyName]}
                />
              </Grid>
            )
        )}
      </Grid>
    </Paper>
  );
};

export default TokenFaceDetails;
