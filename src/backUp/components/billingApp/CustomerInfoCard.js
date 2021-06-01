import React from "react";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import SocialActions from "./SocialActions";
import CompanyLogo from "../../components/billingApp/CompanyLogo";

const useStyles = makeStyles((theme) => ({
  custInfoPaper: {
    height: "100%",
    padding: 20,
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
    borderRadius: 15,
  },
  detailsCont: {
    height: "100%",
    flexWrap: "noWrap",
  },
  socialActionsBox: { padding: "8px 0px 0px 0px" },
}));

const CustomerInfoCard = (props) => {
  const { resource, selectedClient } = props;

  const { billingDetails } = selectedClient || {};
  const { billingAccount, billingAddress, contactDetails } =
    billingDetails || {};

  const classes = useStyles();
  return (
    <Paper className={classes.custInfoPaper}>
      {selectedClient.billingDetails ? (
        <>
          <Grid
            container
            direction="column"
            spacing={2}
            justify="space-around"
            className={classes.detailsCont}
          >
            <Grid item>
              <CompanyLogo logoId={selectedClient.logoId} />
              <Typography variant="subtitle1">
                {selectedClient.customerName}
              </Typography>
              <Box className={classes.socialActionsBox}>
                <SocialActions />
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                <span className={classes.textSecondary}>
                  {getResourceValueByKey(resource, "ACCT._NO.", "Acct. No.")} :
                </span>{" "}
                {billingAccount.accountNumber.replace(/.(?=.{4})/g, "x")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="left"
              >
                {getResourceValueByKey(resource, "CONTACT", "Contact")}
              </Typography>
              <Box className={classes.infoBox}>
                <Typography variant="subtitle2" align="left">
                  {`${contactDetails.firstName} ${contactDetails.LastName ||
                    contactDetails.lastName}`}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {contactDetails.emailId}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {contactDetails.phoneNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="left"
              >
                {getResourceValueByKey(
                  resource,
                  "BILLING_ADDRESS",
                  "Billing Address"
                )}
              </Typography>
              <Box className={classes.infoBox}>
                <Typography variant="subtitle2" align="left">
                  {billingAddress.streetName}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {billingAddress.townName}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {`${billingAddress.state}-${billingAddress.postalCode}, ${billingAddress.countryCode}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="body2">
          {getResourceValueByKey(
            resource,
            "NO_INFO_AVAILABLE!",
            "No Info Available!"
          )}
        </Typography>
      )}
    </Paper>
  );
};

export default CustomerInfoCard;
