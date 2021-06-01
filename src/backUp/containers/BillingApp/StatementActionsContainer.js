import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Button, Divider, FormControlLabel, Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import FormatDate from "../../components/common/FormatDate";
import { statementSent } from "../../utils/getData";
import StyledSwitch from "../../components/common/atoms/Switch/StyledSwitch";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import cloneDeep from "lodash/cloneDeep";
import { format, parseISO } from "date-fns";

const dividerCommonStyles = { height: 4, borderRadius: 5 };

const useStyles = makeStyles((theme) => ({
  noWrap: { flexWrap: "noWrap" },
  gradientDivider: {
    ...dividerCommonStyles,
    width: 100,
    margin: "0px 4px",
    background: "linear-gradient(45deg, #71ccf0, #6f97ed)",
  },
  noGradientDivider: {
    ...dividerCommonStyles,
    width: 100,
    margin: "0px 4px",
    background: "#dfdfdf",
  },
  leftHalfGradientDivider: {
    ...dividerCommonStyles,
    width: 70,
    margin: "0px 2px 0px 4px",
    background: "linear-gradient(45deg, #71ccf0, #6f97ed)",
  },
  rightHalfGradientDivider: {
    ...dividerCommonStyles,
    width: 30,
    margin: "0px 4px 0px 2px",
    background: "linear-gradient(45deg, #e07294, #e66c91)",
  },
}));

const StatementActionsContainer = (props) => {
  const {
    resource,
    rowData,
    handleReloadTable,
    retrieveStatementDetails,
  } = props;
  const { status } = rowData;
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [sentChecked, setSentChecked] = useState(
    status === "Sent" ? true : false
  );

  const [statementSentMutation] = useMutation(statementSent, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleReloadTable();
    },
  });

  const handleChangeSwitch = () => {
    let statementData = cloneDeep(rowData);
    statementData.status = "Sent";
    if (!sentChecked) {
      setSentChecked(true);
      statementData.statementSentDate = format(new Date(), "yyyyMMdd");
      statementSentMutation(statementData);
    }
  };

  const renderStepper = ({ className, multiDivider }) => {
    return (
      <Grid container alignItems="center" className={classes.noWrap}>
        <Grid item>
          <FormatDate
            currentFormat={"yyyymmdd"}
            date={rowData.statementDate}
            typoVariant="body2"
            paddding="0px"
          />
        </Grid>
        {multiDivider ? (
          <Grid item>
            <Grid container alignItems="center" className={classes.noWrap}>
              <Grid item>
                <Divider
                  variant="fullWidth"
                  className={classes.leftHalfGradientDivider}
                />
              </Grid>
              <Grid item>
                <Divider
                  variant="fullWidth"
                  className={classes.rightHalfGradientDivider}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Divider variant="fullWidth" className={classes[className]} />
          </Grid>
        )}

        <Grid item>
          <Grid container alignItems="center" className={classes.noWrap}>
            <Grid item>
              <Typography variant="subtitle2">
                {getResourceValueByKey(resource, "DUE:", "Due:")}
              </Typography>
            </Grid>
            <Grid item>
              <FormatDate
                currentFormat={"yyyymmdd"}
                date={rowData.dueDate}
                paddding="0px"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return status === "New" ? (
    <Button
      variant="outlined"
      onClick={() => retrieveStatementDetails(rowData)}
    >
      {getResourceValueByKey(resource, "REVIEW_STATEMENT", "Review Statement")}
    </Button>
  ) : status === "Approved" ? (
    <FormControlLabel
      control={
        <StyledSwitch checked={sentChecked} onChange={handleChangeSwitch} />
      }
      label={
        <Typography variant="body2">
          {getResourceValueByKey(resource, "STATEMENT_SENT", "Statement Sent")}
        </Typography>
      }
    />
  ) : status === "Paid" ? (
    renderStepper({ className: "gradientDivider", multiDivider: false })
  ) : status === "Sent" ? (
    <Grid container direction="column" alignItems="flex-start" justify="center">
      <Grid item>
        {renderStepper({ className: "noGradientDivider", multiDivider: false })}
      </Grid>
      {rowData.statementSentDate && (
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                {getResourceValueByKey(resource, "SENT_ON:", "Sent on:")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {format(
                  new Date(parseISO(rowData.statementSentDate)),
                  "MM/dd/yyyy"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  ) : status === "Past Due" ? (
    renderStepper({ multiDivider: true })
  ) : null;
};

export default StatementActionsContainer;
