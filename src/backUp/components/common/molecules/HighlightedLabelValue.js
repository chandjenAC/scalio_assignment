import React, { forwardRef } from "react";
import { trimString } from "../../../utils/index";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  highlightedLablValCont: {
    padding: 4,
  },
}));

const ValueWithToolTip = forwardRef((props, ref) => {
  return (
    <Typography variant="body2" align="left" ref={ref}>
      {props.value}
    </Typography>
  );
});

const RenderValueWithHighlight = (props) => {
  const { resource, value } = props;
  return typeof value === "object" && value.hasOwnProperty("oldvalue") ? (
    <Tooltip
      title={
        value.addedAttr
          ? getResourceValueByKey(
              resource,
              "ADDED_ATTRIBUTE",
              "Added attribute"
            )
          : value.newvalue === ""
          ? getResourceValueByKey(
              resource,
              "DELETED_ATTRIBUTE",
              "Deleted attribute"
            )
          : value.oldvalue === ""
          ? getResourceValueByKey(
              resource,
              "NO_PREVIOUS_VALUE",
              "No previous values"
            )
          : value.oldvalue
      }
      maxWidth={600}
      placement="left"
    >
      <Typography
        variant="body2"
        align="left"
        style={{
          background: value.addedAttr
            ? "#a1ffa2"
            : value.newvalue === ""
            ? "#ffabb9"
            : "#d0e1ff",
          display: "block",
        }}
      >
        {value.newvalue === "" ? value.oldvalue : value.newvalue}
      </Typography>
    </Tooltip>
  ) : value.toString().length > 30 ? (
    <Tooltip title={value} maxWidth={600} placement="left">
      <ValueWithToolTip value={trimString(value)} display="block" />
    </Tooltip>
  ) : (
    <Typography variant="body2" align="left">
      {value.toString()}
    </Typography>
  );
};

const RenderLabelWithHighlight = (props) => {
  const { resource, label } = props;
  return typeof label === "object" && label.hasOwnProperty("oldvalue") ? (
    <Tooltip
      title={
        label.addedAttr
          ? getResourceValueByKey(
              resource,
              "ADDED_ATTRIBUTE",
              "Added attribute"
            )
          : label.newvalue === ""
          ? getResourceValueByKey(
              resource,
              "DELETED_ATTRIBUTE",
              "Deleted attribute"
            )
          : label.oldvalue === ""
          ? getResourceValueByKey(
              resource,
              "NO_PREVIOUS_VALUE",
              "No previous value"
            )
          : label.oldvalue
      }
      maxWidth={600}
      placement="left"
    >
      <Typography
        variant="subtitle2"
        align="left"
        style={{
          background: label.addedAttr
            ? "#a1ffa2"
            : label.newvalue === ""
            ? "#ffabb9"
            : "#d0e1ff",
          display: "block",
        }}
      >
        {label.newvalue === "" ? label.oldvalue : label.newvalue}
      </Typography>
    </Tooltip>
  ) : (
    <Typography variant="subtitle2" align="left">
      {label}
    </Typography>
  );
};

const RenderValueArray = (props) => {
  const { valueArray } = props;
  return valueArray.map((value, index) => {
    return <RenderValueWithHighlight key={index} value={value} />;
  });
};

const HighlightedLabelValue = (props) => {
  const { resource, label, value, index } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.highlightedLablValCont}
      index={index}
    >
      {label && (
        <Grid item>
          <RenderLabelWithHighlight resource={resource} label={label} />
        </Grid>
      )}
      {value && (
        <Grid item>
          {Array.isArray(value) ? (
            <RenderValueArray resource={resource} valueArray={value} />
          ) : (
            <RenderValueWithHighlight resource={resource} value={value} />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default HighlightedLabelValue;
