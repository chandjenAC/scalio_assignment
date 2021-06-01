import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: theme.typography.body2.fontSize,
    paddingTop: 0,
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

const AsyncFilter = (props) => {
  const {
    loading,
    options,
    placeholder,
    handleInputChange,
    handleChange,
    setOpen,
    open,
    defaultValue,
  } = props;

  const classes = useStyles();

  return (
    <Autocomplete
      size="small"
      style={{ width: "auto", paddingTop: 1 }}
      defaultValue={defaultValue}
      classes={{
        option: classes.option,
        noOptions: classes.noOptions,
        loading: classes.noOptions,
        listbox: classes.listbox,
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name || ""}
      options={options}
      loading={loading}
      onChange={(event, value) => handleChange(value)}
      onInputChange={(e, value) =>
        handleInputChange && handleInputChange(e, value)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          //   label={placeholder}
          variant="standard"
          // margin="dense"
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title={"Filter"}>
                  <FilterIcon className={classes.icon} />
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="primary" size={20} />
                ) : null}
                {/* {params.InputProps.endAdornment} */}
                <InputAdornment position="end">
                  <SearchIcon className={classes.icon} />
                </InputAdornment>
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncFilter;
