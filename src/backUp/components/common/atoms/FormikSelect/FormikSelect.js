import React from "react";
import resource from "../../../../resources/common.json";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const FormikSelect = ({
  form: { setFieldValue },
  field: { name, value },
  label,
  disabled,
  onChange,
  options,
  multiple,
  minWidth,
  ...rest
}) => {

  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        style={{
          minWidth: minWidth,
          textAlign: "left",
        }}
        multiple={multiple}
        margin="dense"
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
          onChange && onChange(e.target.value);
        }}
        disabled={disabled}
      >
        <MenuItem value="">
          <em>{getResourceValueByKey(resource, "NONE", "Clear")}</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormikSelect;
