import React, { useState, useEffect } from "react";
import LabelAndValue from "../LabelAndValue";
import { TextField, Grid, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    padding: 20,
    right: 0,
    top: 34,
    zIndex: 99,
  },
  textField: {
    margin: "1.5px 0px",
  },
  input: {
    fontSize: "inherit",
  },
}));

const LabelWithEditableValue = (props) => {
  const { label, value: valueProp, updateValueRef, meta } = props;
  const classes = useStyles();

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const [value, setValue] = useState(valueProp);

  const updateRef = (value) => {
    let fieldName = meta.key;
    let ref = updateValueRef.refObj;
    let indices = updateValueRef.refIndices;
    for (let i = 0; i < indices.length; i++) {
      ref = ref[indices[i]];
    }
    ref[fieldName] = value;
  };

  const handleChangeValue = (e) => {
    let value = meta.lowerCase ? e.target.value.toLowerCase() : e.target.value;
    setValue(value);
    updateRef(value);
  };

  // const handleSelectValue = (e) => {
  //   setValue(e.value);
  //   updateRef(e.value);
  // };

  // const handleSelectInputChange = (e) => {
  //   const inputValue = e.replace(/\W/g, "");
  //   setValue(inputValue);
  //   return inputValue;
  // };

  const getInputFieldsBasedOnMeta = () => {
    switch (meta.prop) {
      case "read-only":
        return <LabelAndValue label={null} value={value} padding="0px" />;
      case "editable":
        return (
          <TextField
            classes={{ root: classes.textField }}
            InputProps={{
              className: classes.input,
            }}
            margin="dense"
            size="small"
            label={label}
            placeholder={`Enter ${label}`}
            value={value}
            onChange={(e) => handleChangeValue(e)}
          />
        );
      case "counter":
        return (
          <TextField
            type="number"
            classes={{ root: classes.textField }}
            InputProps={{
              className: classes.input,
            }}
            margin="dense"
            size="small"
            label={label}
            placeholder={`Enter ${label}`}
            value={value}
            onChange={(e) => handleChangeValue(e)}
          />
        );
      case "select":
        return (
          <TextField
            select
            classes={{ root: classes.textField }}
            InputProps={{
              className: classes.input,
            }}
            label={label}
            value={value}
            margin="dense"
            onChange={(e) => handleChangeValue(e)}
          >
            {meta.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        );
      // case "look-up":
      //   return (
      //     <StyledAsyncSelect
      //       selectedValue={value}
      //       loadOptions={loadOptions}
      //       onInputChange={(e) => handleSelectInputChange(e)}
      //       onChange={(e) => handleSelectValue(e)}
      //     />
      //   );
      default:
        break;
    }
  };

  const editValue = () => {
    return getInputFieldsBasedOnMeta();
  };

  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item>{(value || value === "") && editValue()}</Grid>
    </Grid>
  );
};

export default LabelWithEditableValue;
