import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { post } from "../../../utils/callApi";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress } from "@material-ui/core";
import { getFilterSortPaginate } from "../../../utils/getPayloads/getFilterSortPaginate";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listbox: {
    backgroundColor: "#fffff",
    padding: 0,
  },
  option: {
    fontSize: "0.875rem",
    padding: "5px 10px",
  },
  noOptions: {
    fontSize: "0.875rem",
    padding: "5px 10px",
  },
  loading: {
    fontSize: "0.875rem",
    padding: "5px 10px",
  },
}));

const LookUpID = (props) => {
  const {
    fieldName,
    fieldId,
    fieldValue,
    primaryFilter,
    label,
    onChange,
    url,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const getOptions = async (filter) => {
    let options = [];
    let sort = [];
    let paging = {};
    let filters = [
      {
        fieldName: fieldName,
        operator: "neq",
        values: ["NULL"],
      },
    ];
    if (primaryFilter) {
      filters.push(primaryFilter);
    }
    if (filter?.length > 0) {
      filters.concat(filter);
    }

    let body = getFilterSortPaginate(filters, sort, paging);
    let response = await post(url, body);

    response.data.map((item) => {
      options.push({ key: item.id, value: item.name });
    });
    return options;
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let options = await getOptions();

      if (active) {
        setOptions(options);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, fieldValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      size="small"
      style={{ marginBottom: 6 }}
      classes={classes}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option.value || ""}
      defaultValue={{ key: fieldId, value: fieldValue }}
      options={options}
      loading={loading}
      onChange={(event, value) => onChange(value?.key)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default LookUpID;
