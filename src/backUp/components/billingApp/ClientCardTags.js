import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  tagsMainCont: {
    position: "absolute",
    top: 8,
    left: 0,
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  typo: {
    fontWeight: 600,
  },
  contractDueSoon: {
    background: "#dedede",
    borderRadius: "0px 5px 5px 0px",
    width: "fit-content",
    padding: "3px 8px",
  },
  billing: {
    background: "#ccfcde",
    width: "fit-content",
    borderRadius: "0px 5px 5px 0px",
    padding: "3px 8px",
  },
  pastDue: {
    background: "#fc9aac",
    borderRadius: "0px 5px 5px 0px",
    width: "fit-content",
    padding: "3px 8px",
  },
}));

// const tagsData = [
//   { billing: true },
//   { billing: false },
//   { billing: false },
//   { billing: false },
//   { billing: false },
//   { billing: true },
//   { billing: false },
//   { billing: true },
//   { billing: false },
//   { billing: false },
//   { billing: false },
//   { billing: false },
//   { billing: true },
//   { billing: false },
//   { billing: true },
//   { billing: false },
//   { billing: false },
//   { billing: false },
//   { billing: false },
//   { billing: true },
//   { billing: false },
// ];

const ClientCardTags = (props) => {
  const { index, resource, lastStatementDetails, priceBookDetails } = props;
  const classes = useStyles();
  return (
    <div className={classes.tagsMainCont} key={index}>
      {priceBookDetails?.contractEndingSoon && (
        <div className={classes.contractDueSoon}>
          <Typography variant="caption" className={classes.typo}>
            {getResourceValueByKey(
              resource,
              "CONTRACT_DUE_SOON",
              "Contract Due Soon"
            )}
          </Typography>
        </div>
      )}

      {/* {tagsData[index].billing && (
        <div className={classes.billing}>
          <Typography variant="caption" className={classes.typo}>
            Billing
          </Typography>
        </div>
      )} */}

      {lastStatementDetails?.pastDue && (
        <div className={classes.pastDue}>
          <Typography variant="caption" className={classes.typo}>
            {`${getResourceValueByKey(resource, "PD", "PD")} (${
              lastStatementDetails.pastDueInDays
            })${getResourceValueByKey(resource, "D", "d")}`}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ClientCardTags;
