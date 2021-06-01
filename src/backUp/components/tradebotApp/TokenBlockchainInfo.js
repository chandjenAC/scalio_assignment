import React from "react";
import LabelAndValue from "../common/LabelAndValue";
import Loader from "../common/atoms/Loaders/Loader";
import { makeStyles } from "@material-ui/core/styles";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Grid, Typography } from "@material-ui/core";

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

const TokenBlockchainInfo = (props) => {
  const { resource, loading, error, dltInfo, networkInfo, dltTxnInfo } = props;
  const classes = useStyles();

  return (
    <Grid container justify="flex-start">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="subtitle1" color="primary" align="center">
          {getResourceValueByKey(resource, "BLOCKCHAIN", "Blockchain")}
        </Typography>
      </Grid>
      {loading ? (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      ) : error ? (
        <div className={classes.centerDiv}>
          <Typography variant="subtitle2" color="error">
            {getResourceValueByKey(
              resource,
              "SOMETHING_WENT_WRONG!",
              "Something went wrong!"
            )}
          </Typography>
        </div>
      ) : (
        dltInfo && (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={classes.mainGridItem}
            >
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
                      "DLT_NETWORK",
                      "DLT Network"
                    )}
                  </Typography>
                </Grid>
                {Object.keys(networkInfo).map(
                  (key, i) =>
                    networkInfo[key] && (
                      <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                        <LabelAndValue label={key} value={networkInfo[key]} />
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={classes.mainGridItem}
            >
              <Grid container justify="flex-start">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    align="left"
                    className={classes.subtitle}
                  >
                    {getResourceValueByKey(resource, "DLT_TXN", "DLT Txn.")}
                  </Typography>
                </Grid>
                {Object.keys(dltTxnInfo).map(
                  (key, i) =>
                    dltTxnInfo[key] && (
                      <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                        <LabelAndValue label={key} value={dltTxnInfo[key]} />
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
          </>
        )
      )}
    </Grid>
  );
};

export default TokenBlockchainInfo;
