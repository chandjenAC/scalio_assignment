import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import resource from "../../../resources/common.json";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const StyledSelect = (props) => {
  const {
    label,
    options,
    handleChange,
    resetValue,
    disabled,
    defaultValue,
    variant,
    minWidth,
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: minWidth ? minWidth : 120,
    },
    inputLabelOutlined: { transform: "translate(14px, 8px) scale(1)" },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectRoot: {
      padding: 6,
    },
  }));

  const useOutlinedInputStyles = makeStyles((theme) => ({
    root: {
      "& $notchedOutline": {
        borderColor:
          variant === "outlined"
            ? theme.palette.common.black
            : theme.palette.common.white,
      },
      "&:hover $notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
      "&$focused $notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
    notchedOutline: {},
  }));


  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const inputLabel = React.useRef(null);

  const [value, setValue] = React.useState(defaultValue || "");
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (resetValue !== undefined && resetValue !== null) {
      setValue("");
    }
  }, [resetValue]);

  const onChange = (e) => {
    setValue(e.target.value);
    handleChange && handleChange(e.target.value);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          ref={inputLabel}
          classes={{ outlined: classes.inputLabelOutlined }}
        >
          {label}
        </InputLabel>
        <Select
          disabled={disabled}
          value={value}
          classes={{ root: classes.selectRoot }}
          onChange={onChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              classes={outlinedInputClasses}
            />
          }
        >
          <MenuItem value="">
            <em>{getResourceValueByKey(resource, "NONE", "None")}</em>
          </MenuItem>
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </form>
  );
};
export default StyledSelect;
