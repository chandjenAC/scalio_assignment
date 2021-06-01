import React, { forwardRef } from "react";
import { trimString } from "../../utils/index";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Tooltip } from "@material-ui/core";
import TruncateAndCopy from "./molecules/TruncateAndCopy";

//check for these labels to format as hash address
const hashAddressLabels = [
  "Block Address",
  "Txn Address",
  "Transaction Address",
];

const ValueWithToolTip = forwardRef((props, ref) => {
  return (
    <Typography variant="subtitle2" ref={ref} align="left">
      {props.showValueIndex
        ? `${props.index + 1}. ${props.value}`
        : props.value}
    </Typography>
  );
});

const FromValueArrayWithToolTip = forwardRef((props, ref) => {
  return (
    <Typography
      variant="subtitle2"
      ref={ref}
      style={{ display: "block" }}
      align="left"
    >
      {props.showValueIndex
        ? `${props.index + 1}. ${props.value}`
        : props.value}
    </Typography>
  );
});

const RenderValueArray = (props) => {
  return props.valueArray.map((value, index) => {
    return value.toString().length > 30 ? (
      <Tooltip
        key={index}
        title={props.showValueIndex ? `${index + 1}. ${value}` : value}
      >
        <FromValueArrayWithToolTip
          value={trimString(value)}
          showValueIndex={props.showValueIndex}
          index={index}
        />
      </Tooltip>
    ) : (
      <Typography
        variant="subtitle2"
        key={index}
        style={{ display: "block" }}
        align="left"
      >
        {props.showValueIndex
          ? `${index + 1}. ${value}`.toString()
          : value.toString()}
      </Typography>
    );
  });
};

const LabelAndValue = (props) => {
  const { label, value, showValueIndex, index } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: 0,
      padding: "4px",
    },
  }));

  const classes = useStyles();

  return (
    value !== undefined && (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="flex-start"
        index={index}
      >
        {label && (
          <Grid item>
            <Typography variant="body2" color="textSecondary" align="left">
              {label}
            </Typography>
          </Grid>
        )}
        <Grid item>
          {Array.isArray(value) ? (
            <RenderValueArray
              valueArray={value}
              showValueIndex={showValueIndex}
            />
          ) : hashAddressLabels.includes(label) ? (
            // <Tooltip title={value}>
            //   <ValueWithToolTip value={formatHashAddress(value)} />
            <TruncateAndCopy value={value} copy={true} truncate={true} />
          ) : // </Tooltip>
          value.toString().length > 30 ? (
            // <Tooltip title={value}>
            //   <ValueWithToolTip value={trimString(value)} />
            <TruncateAndCopy value={value} copy={true} truncate={true} />
          ) : (
            // </Tooltip>
            <Typography variant="subtitle2" align="left">
              {value.toString()}
            </Typography>
          )}
        </Grid>
      </Grid>
    )
  );
};

export default LabelAndValue;
