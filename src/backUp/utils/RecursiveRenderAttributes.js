import React from "react";
import LabelAndValue from "../components/common/LabelAndValue";
import { Grid, Typography } from "@material-ui/core";

const labelAndValue = (label, value, index, width) => {
  return (
    <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
      <LabelAndValue label={label} value={value} index={index} />
    </Grid>
  );
};

const renderArray = (key, data, i) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} key={i}>
      {data !== undefined && data.length > 0 && (
        <Typography variant="subtitle2" color={"primary"}>
          {key}
        </Typography>
      )}
      {data.map((d, j) => {
        return <RecursiveRenderAttributes key={j} data={d} />;
      })}
    </Grid>
  );
};

const renderObject = (key, data, i) => {
  return (
    <Grid item key={i}>
      {/* {data !== undefined && !_.isEmpty(data) && (
        <Label padding="4px 0px 4px 0px" width="100%" color="#2574fb">
          {key}
        </Label>
      )} */}
      {Object.keys(data).map((k, j) => {
        return <RecursiveRenderAttributes key={j} data={data[k]} name={k} />;
      })}
    </Grid>
  );
};

const RecursiveRenderAttributes = (props) => {
  const { data, name } = props;
  return (
    <Grid container justify="flex-start">
      {typeof data === "string" ||
      typeof data === "boolean" ||
      typeof data === "number"
        ? labelAndValue(name, data, 1, "100%")
        : Object.keys(data).map((key, i) => {
            if (
              typeof data[key] === "string" ||
              typeof data[key] === "boolean" ||
              typeof data[key] === "number"
            ) {
              return labelAndValue(key, data[key], i);
            } else if (Array.isArray(data[key])) {
              return renderArray(key, data[key], i);
            } else if (data[key] !== null && typeof data[key] === "object") {
              return renderObject(key, data[key], i);
            }
          })}
    </Grid>
  );
};

export default RecursiveRenderAttributes;
