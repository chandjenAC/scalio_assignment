import React from "react";
import LabelAndValue from "../common/LabelAndValue";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../common/atoms/Loaders/Loader";

const useStyles = makeStyles((theme) => ({
  mainGridItem: {
    padding: "4px 0px 4px",
  },
  subtitle: {
    paddingLeft: 4,
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
const TokenAssociations = (props) => {
  const {
    resource,
    loading,
    anchors,
    userDetails,
    starfleets,
    networkDetails,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="flex-start">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="subtitle1" color="primary" align="center">
          {getResourceValueByKey(resource, "TOPVERSE", "Topverse")}
        </Typography>
      </Grid>
      {loading ? (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.mainGridItem}
          >
            {userDetails.length > 0 && (
              <Grid container justify="flex-start">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    align="left"
                    className={classes.subtitle}
                  >
                    {getResourceValueByKey(resource, "USERS", "Users")}
                  </Typography>
                </Grid>
                {userDetails.map((user) => {
                  return Object.keys(user).map((key, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                      <LabelAndValue label={key} value={user[key]} />
                    </Grid>
                  ));
                })}
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.mainGridItem}
          >
            {anchors.length > 0 && (
              <Grid container justify="flex-start">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    align="left"
                    className={classes.subtitle}
                  >
                    {getResourceValueByKey(resource, "ANCHORS", "Anchors")}
                  </Typography>
                </Grid>
                {anchors.map((anchor) => {
                  return Object.keys(anchor).map((key, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                      <LabelAndValue label={key} value={anchor[key]} />
                    </Grid>
                  ));
                })}
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.mainGridItem}
          >
            {starfleets.length > 0 && (
              <Grid container justify="flex-start">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    align="left"
                    className={classes.subtitle}
                  >
                    {getResourceValueByKey(
                      resource,
                      "STARFLEETS",
                      "Starfleets"
                    )}
                  </Typography>
                </Grid>
                {starfleets.map((starfleet) => {
                  return Object.keys(starfleet).map((key, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                      <LabelAndValue label={key} value={starfleet[key]} />
                    </Grid>
                  ));
                })}
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.mainGridItem}
          >
            {networkDetails.length > 0 && (
              <Grid container justify="flex-start">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    align="left"
                    className={classes.subtitle}
                  >
                    {getResourceValueByKey(
                      resource,
                      "NETWORK_INFO",
                      "Network Info"
                    )}
                  </Typography>
                </Grid>
                {networkDetails.map((network) => {
                  return Object.keys(network).map(
                    (key, i) =>
                      network[key] && (
                        <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                          <LabelAndValue label={key} value={network[key]} />
                        </Grid>
                      )
                  );
                })}
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default TokenAssociations;
