import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fullWidth: { width: "100%" },
}));

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // prefix={prefix}
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumberFormattedInput = ({
  label,
  placeholder,
  onChange,
  form,
  field,
  prefix,
}) => {
  const classes = useStyles();

  const { setFieldValue } = form || {};
  const { name, value } = field || {};

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    //on resetting formik form values after form submit, clear the value
    if (value === 0) {
      setSelectedValue("");
    }
  }, [value]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    setFieldValue && setFieldValue(name, e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <TextField
      className={classes.fullWidth}
      label={label}
      placeholder={placeholder}
      value={selectedValue}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom,
        inputProps: { prefix: `${prefix} ` },
      }}
    />
  );
};

export default NumberFormattedInput;
