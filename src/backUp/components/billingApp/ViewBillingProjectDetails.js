import React, { useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import Address from "../common/Address";
import LabelsValuesInDialog from "../common/molecules/LabelsValuesInDialog";

const useStyles = makeStyles((theme) => ({
  buttonText: {
    fontWeight: 400,
  },
}));

const ViewBillingProjectDetails = ({ resource, billingDetails }) => {
  const classes = useStyles();
  const [viewBillingDetails, setViewBillingDetails] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setViewBillingDetails(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setViewBillingDetails(false);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleClose,
    },
  ];

  const ContactInfo = ({ contact }) => {
    return (
      <Grid container direction="column" alignItems="flex-start">
        <Grid item>
          <Typography variant="subtitle2">{`${contact.firstName} ${
            contact.LastName ? contact.LastName : ""
          }`}</Typography>
        </Grid>
        {contact.emailId && (
          <Grid item>
            <Typography variant="subtitle2">{contact.emailId}</Typography>
          </Grid>
        )}
        {contact.phoneNumber && (
          <Grid item>
            <Typography variant="subtitle2">{contact.phoneNumber}</Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <>
      <Button
        color="primary"
        classes={{ label: classes.buttonText }}
        onClick={handleOpen}
      >
        {getResourceValueByKey(resource, "VIEW", "View")}
      </Button>
      {viewBillingDetails && (
        <DialogBox
          open={viewBillingDetails}
          showTitleDivider={true}
          handleClose={handleClose}
          dialogActions={dialogActions}
          title={getResourceValueByKey(
            resource,
            "BILLING_DETAILS",
            "Billing Details"
          )}
        >
          <LabelsValuesInDialog
            data={[
              {
                label: getResourceValueByKey(
                  resource,
                  "ACCOUNT_NAME",
                  "Account Name"
                ),
                value: billingDetails?.billingAccount?.accountName,
              },
              {
                label: getResourceValueByKey(
                  resource,
                  "ACCOUNT_NUMBER",
                  "Account Number"
                ),
                value: billingDetails?.billingAccount?.accountNumber?.replace(
                  /.(?=.{4})/g,
                  "x"
                ),
              },
              {
                label: getResourceValueByKey(
                  resource,
                  "BILLING_CYCLE",
                  "Billing Cycle"
                ),
                value: billingDetails?.billingCycle?.cycleDate,
              },
              {
                label: getResourceValueByKey(
                  resource,
                  "BILLING_PERIOD",
                  "Billing Period"
                ),
                value: billingDetails?.billingCycle?.cyclePeriod,
              },
              {
                label: getResourceValueByKey(
                  resource,
                  "BILLING_ADDRESS",
                  "Billing Address"
                ),
                value: (
                  <Address
                    address={billingDetails.billingAddress}
                    padding={"0px"}
                  />
                ),
              },
              {
                label: getResourceValueByKey(resource, "CONTACT", "Contact"),
                value: <ContactInfo contact={billingDetails.contactDetails} />,
              },
            ]}
          />
        </DialogBox>
      )}
    </>
  );
};

export default ViewBillingProjectDetails;
