import React, { useState, useEffect } from "react";
import SelectMolecule from "../common/molecules/SelectMolecule";
import { TextField, makeStyles, Typography, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "2px 6px 0px 0px",
  },
}));

const SelectDataType = (props) => {
  const { resource, label, rowData, onChange, options } = props;
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState("");
  const [format, setFormat] = useState("");

  useEffect(() => {
    if (!["date", "time"].includes(rowData.datatype)) {
      delete rowData.dateFormat;
    }
  }, [selectedValue]);

  const handleChangeFormat = (value) => {
    setFormat(value);
  };

  const handleDialogClose = () => {
    setSelectedValue("");
  };

  const handleUpdateFormat = () => {
    setSelectedValue("");
    rowData.dateFormat = format;
  };

  const handleChangeDataType = (dataType) => {
    setSelectedValue(dataType);
    onChange(dataType);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "OK", "Ok"),
      handler: handleUpdateFormat,
    },
  ];

  const getFormat = (label, helperText, example) => (
    <Grid container spacing={2}>
      <Grid item>
        <TextField
          className={classes.textField}
          label={label}
          value={format}
          onChange={(e) => handleChangeFormat(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
        <Typography
          style={{ display: "inline-block" }}
          variant="caption"
          color="textSecondary"
        >
          {example}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <SelectMolecule
        label={label}
        defaultValue={rowData.datatype}
        onChange={handleChangeDataType}
        options={options}
      />

      <DialogBox
        open={selectedValue === "date"}
        handleClose={handleDialogClose}
        dialogActions={dialogActions}
        title={getResourceValueByKey(
          resource,
          "ENTER_DATE_FORMAT",
          "Enter Date Format"
        )}
      >
        {getFormat(
          getResourceValueByKey(resource, "DATE_FORMAT", "Date Format"),
          getResourceValueByKey(
            resource,
            "DATE_FORMAT_HELPER_TEXT",
            "*DD for Date, MM for Month and YYYY for Year in any order seperated by ' - ', ' / ' or space."
          ),
          getResourceValueByKey(
            resource,
            "DATE_FORMAT_EXAMPLE",
            "eg. MM/DD/YYYY, DD-MM-YYYY, MM DD YYYY"
          )
        )}
      </DialogBox>

      <DialogBox
        open={selectedValue === "time"}
        handleClose={handleDialogClose}
        dialogActions={dialogActions}
        title={getResourceValueByKey(
          resource,
          "ENTER_TIME_FORMAT",
          "Enter Time Format"
        )}
      >
        {getFormat(
          getResourceValueByKey(resource, "TIME_FORMAT", "Time Format"),
          getResourceValueByKey(
            resource,
            "TIME_FORMAT_HELPER_TEXT",
            "*DD for Date, MM for Month, YYYY for Year, HH for Hour, MM for Minute, and SS for Second. Date can be seperated using ' - ', ' / ' or space and seperate time using ' : '."
          ),
          getResourceValueByKey(
            resource,
            "TIME_FORMAT_EXAMPLE",
            "eg. MM/DD/YYYY HH:MM:SS, DD-MM-YYYY HH:MM, MM DD YYYY HH:MM"
          )
        )}
      </DialogBox>
    </>
  );
};

export default SelectDataType;
