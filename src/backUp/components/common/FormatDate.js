import React from "react";
import { Grid, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { seperateAndFormatDate } from "../../utils/index";

const FormatDate = (props) => {
  const { date, label, currentFormat, typoVariant, padding } = props;

  let formattedDate;

  if (date !== undefined && date !== "") {
    if (
      !date.includes("/") &&
      (currentFormat === "yyyymmdd" || date.length === 8)
    ) {
      formattedDate = seperateAndFormatDate(date);
    } else {
      formattedDate = format(new Date(date), "MM/dd/yyyy");
    }
  } else {
    formattedDate = "";
  }

  //let  formattedDate = `${month}/${day}/${year}`;

  return formattedDate ? (
    <Grid
      container
      direction="column"
      style={{ padding: padding ? padding : "4px" }}
      alignItems="flex-start"
    >
      {label && (
        <Grid item>
          <Typography variant="body2">{label}</Typography>
        </Grid>
      )}
      <Grid item>
        <Typography variant={typoVariant ? typoVariant : "subtitle2"}>
          {formattedDate}
        </Typography>
      </Grid>
    </Grid>
  ) : null;
};

export default FormatDate;
