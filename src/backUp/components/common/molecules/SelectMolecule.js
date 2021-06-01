import React, { useState } from "react";
import { Select, MenuItem, makeStyles, Input } from "@material-ui/core";
import { FormControl, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: { fill: theme.palette.primary.main },
  underline: {
    "&:before": {
      height: "1px",
      backgroundColor: theme.palette.common.white,
    },
  },
}));

const SelectMolecule = (props) => {
  const {
    label,
    defaultValue,
    onChange,
    options,
    disabled,
    minWidth,
    labelColor,
    textColor,
  } = props;
  const classes = useStyles();

  const [value, setValue] = useState(defaultValue || "");

  return (
    <FormControl>
      <InputLabel style={{ color: labelColor ? labelColor : "#000" }}>
        {label}
      </InputLabel>
      <Select
        style={{
          minWidth: minWidth || 120,
          textAlign: "left",
          color: textColor ? textColor : "#000",
        }}
        classes={{ icon: classes.icon }}
        input={
          <Input
            classes={{
              underline: classes.underline,
            }}
          />
        }
        margin="dense"
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
          setValue(e.target.value);
        }}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMolecule;
