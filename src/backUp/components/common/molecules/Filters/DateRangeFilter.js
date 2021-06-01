import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Grid, makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";
import resource from "../../../../resources/common.json";
import { parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  keyboardDatePicker: {
    margin: 0,
    "& svg": {
      width: "1rem",
      height: "1rem",
    },
  },
}));

const DateRangeFilter = (props) => {
  const { gte, lte, getFromDate, getToDate } = props;

  const classes = useStyles();

  const handleChangeGte = (e) => {
    getFromDate(e);
  };

  const handleChangeLte = (e) => {
    getToDate(e);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item>
          <KeyboardDatePicker
            className={classes.keyboardDatePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            autoOk={true}
            disableFuture
            label={getResourceValueByKey(resource, "FROM", "From")}
            placeholder={
              (getResourceValueByKey, resource, "MM/DD/YYYY", "mm/dd/yyyy")
            }
            value={
              gte
                ? typeof gte?.getTime === "function"
                  ? gte
                  : new Date(parseISO(gte))
                : null
            }
            onChange={handleChangeGte}
          />
        </Grid>
        <Grid item>
          <KeyboardDatePicker
            className={classes.keyboardDatePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            autoOk={true}
            label={getResourceValueByKey(resource, "TO", "To")}
            placeholder={
              (getResourceValueByKey, resource, "MM/DD/YYYY", "mm/dd/yyyy")
            }
            value={
              lte
                ? typeof lte?.getTime === "function"
                  ? lte
                  : new Date(parseISO(lte))
                : null
            }
            onChange={handleChangeLte}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DateRangeFilter;
