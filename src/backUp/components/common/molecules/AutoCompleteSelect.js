import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: theme.typography.body2.fontSize,
    paddingTop: 0,
  },
  inputRoot: {
    '&[class*="MuiInput-root"][class*="MuiInput-marginDense"] .MuiAutocomplete-input:first-child': {
      padding: 2,
    },
  },
  listbox: {
    padding: "4px 8px",
  },
  option: {
    padding: 1,
    fontSize: theme.typography.body2.fontSize,
  },
  noOptions: {
    padding: 5,
    fontSize: theme.typography.body2.fontSize,
  },
  icon: {
    fontSize: "1.3rem",
  },
}));

const AutoCompleteSelect = (props) => {
  const { options, defaultValue, label, placeholder, onChange } = props;

  const classes = useStyles();

  return (
    <Autocomplete
      size="small"
      style={{ width: 150, margin: "auto" }}
      classes={{
        option: classes.option,
        noOptions: classes.noOptions,
        loading: classes.noOptions,
        listbox: classes.listbox,
        inputRoot: classes.inputRoot,
        // input: classes.input,
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => onChange(value)}
      defaultValue={defaultValue} //will be like {label:"",value:""}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default AutoCompleteSelect;
