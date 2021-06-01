import React, { useRef, useState } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { Grow, Paper } from "@material-ui/core";
import { Popover, Button, AppBar, Tabs, Tab } from "@material-ui/core";
import { TextField, FormGroup, FormControlLabel } from "@material-ui/core";
import { Switch, MenuItem, Select } from "@material-ui/core";
import RightArrow from "@material-ui/icons/ArrowRightAlt";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import UpdateIcon from "@material-ui/icons/Input";
import { getMonthName } from "../../../../utils";
import { calcDateFromOffset } from "../../../../utils";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import TabPanel from "../../atoms/TabPanel/TabPanel";
import resource from "../../../../resources/common.json";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        height: "auto",
        minHeight: 50,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        margin: "auto",
      },
    },
  },
  palette: {
    primary: {
      main: "#2574fb",
      light: "#d0e1ff",
      dark: "#303f9f",
    },
  },
  typography: {
    fontFamily: ["Lato"].join(","),
    button: {
      textTransform: "none",
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: 12,
    },
    subtitle1: {
      fontSize: "0.725rem",
    },
    h3: {
      fontSize: "2.15rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "0.725rem",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    flexWrap: "noWrap",
  },
  button: {
    padding: 0,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  popover: { width: 325 },
  appBar: {
    width: "100%",
  },
  tabsRoot: {
    minHeight: 32,
  },
  tabRoot: {
    padding: 0,
    minHeight: 32,
  },
  detailsBox: {
    padding: 0,
    width: "100%",
  },
  relativeDatePanel: {
    // flexWrap: "noWrap",
    padding: 10,
  },
  gridItems: {
    padding: 4,
  },
  fullWidth: {
    width: "100%",
  },
  formControlLabel: {
    margin: 0,
  },
  icon: {
    verticalAlign: "middle",
    margin: "12px 6px 0px 6px",
    fontSize: "21px",
    color: theme.palette.grey[800],
  },
  updateIcon: {
    verticalAlign: "middle",
    marginTop: "12px",
    fontSize: "22px",
  },
  closeIcon: {
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  relativeDateContainer: {
    padding: "0px 16px",
    background: theme.palette.primary.main,
  },
  greyish: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  test: {
    background: "red",
  },
  updateButton: {
    minWidth: 32,
  },
}));

const DateTimeFilter = (props) => {
  const {
    update,
    setViewFilter,
    disableUpdateIcon,
    getFromDate,
    getToDate,
    defaultFromDate,
    defaultToDate,
  } = props;

  const options = [
    getResourceValueByKey(resource, "SECONDS_AGO", "Seconds ago"),
    getResourceValueByKey(resource, "MINUTES_AGO", "Minutes ago"),
    getResourceValueByKey(resource, "HOURS_AGO", "Hours ago"),
    getResourceValueByKey(resource, "DAYS_AGO", "Days ago"),
    getResourceValueByKey(resource, "WEEKS_AGO", "Weeks ago"),
    getResourceValueByKey(resource, "MONTHS_AGO", "Months ago"),
    getResourceValueByKey(resource, "YEARS_AGO", "Years ago"),
    getResourceValueByKey(resource, "SECONDS_FROM_NOW", "Seconds from now"),
    getResourceValueByKey(resource, "MINUTES_FROM_NOW", "Minutes from now"),
    getResourceValueByKey(resource, "HOURS_FROM_NOW", "Hours from now"),
    getResourceValueByKey(resource, "DAYS_FROM_NOW", "Days from now"),
    getResourceValueByKey(resource, "WEEKS_FROM_NOW", "Weeks from now"),
    getResourceValueByKey(resource, "MONTHS_FROM_NOW", "Months from now"),
    getResourceValueByKey(resource, "YEARS_FROM_NOW", "Years from now"),
  ];

  const classes = useStyles();
  const tabsActions = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fromDate, setFromDate] = useState(defaultFromDate || "");
  const [toDate, setToDate] = useState(defaultToDate || "");
  const [flag, setFlag] = useState({ from: false, to: false });
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [relativeDate, setRelativeDate] = useState({
    offset: 0,
    offsetBy: getResourceValueByKey(resource, "MINUTES_AGO", "Minutes ago"),
  });

  // useEffect(() => {
  //   if (fromDate !== "" || toDate !== "") {
  //     clearFilterValues();
  //   }
  // }, [clearFilter]);

  // const clearFilterValues = () => {
  //   setFromDate("");
  //   setToDate("");
  // };

  const handleOpenPopover = (event, tempFlag) => {
    if (tempFlag.from) {
      setFlag({ from: true, to: false });
    } else {
      setFlag({ from: false, to: true });
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedTab(0);
  };

  const open = Boolean(anchorEl);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    window.dispatchEvent(new CustomEvent("resize"));
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const setDate = (date) => {
    if (flag.from) {
      setFromDate(new Date(date));
      getFromDate && getFromDate(new Date(date));
    } else {
      setToDate(new Date(date));
      getToDate && getToDate(new Date(date));
    }
  };

  const handleChangeOffsetBy = (e) => {
    setRelativeDate((prevValues) => ({
      ...prevValues,
      offsetBy: e.target.value,
    }));

    let relDate = calcDateFromOffset(
      relativeDate.offset,
      e.target.value,
      checked
    );
    setDate(relDate);
  };

  const handleChangeOffset = (e) => {
    e.persist();
    setRelativeDate((prevValues) => ({
      ...prevValues,
      offset: e.target.value,
    }));
    let relDate = calcDateFromOffset(
      e.target.value,
      relativeDate.offsetBy,
      checked
    );
    setDate(relDate);
  };

  const toggleChecked = (e) => {
    setChecked((prev) => !prev);
    let relDate = calcDateFromOffset(
      relativeDate.offset,
      relativeDate.offsetBy,
      e.target.checked
    );
    setDate(relDate);
  };

  const updateIndicator = () => {
    tabsActions.current.updateIndicator();
  };

  const handleChangeDate = (e) => {
    if (flag.to) {
      if (fromDate !== "" && fromDate.getTime() > e.getTime()) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      if (toDate !== "" && e.getTime() > toDate.getTime()) {
        setError(true);
      } else {
        setError(false);
      }
    }
    setDate(e);
    // flag.from ? setFromDate(e) : setToDate(e);
  };

  const handleClearInputClick = (e, flag) => {
    e.stopPropagation();
    if (flag.from) {
      setFromDate("");
      getFromDate && getFromDate("");
      if (toDate === "") {
        setViewFilter && setViewFilter(false);
      }
      update && update(toDate, "", props);
    } else {
      setToDate("");
      getToDate && getToDate("");
      if (fromDate === "") {
        setViewFilter && setViewFilter(false);
      }
      update && update("", fromDate, props);
    }
  };

  const filterResults = () => {
    update(toDate, fromDate, props);
  };

  const getPopoverContent = () => {
    return (
      <>
        <AppBar
          position="static"
          color="transparent"
          className={classes.appBar}
        >
          <Tabs
            action={tabsActions}
            classes={{ root: classes.tabsRoot }}
            value={selectedTab}
            indicatorColor="secondary"
            onChange={handleChangeTab}
            centered
          >
            <Tab
              classes={{ root: classes.tabRoot }}
              label={getResourceValueByKey(resource, "ABSOLUTE", "Absolute")}
              {...a11yProps(0)}
            />
            <Tab
              classes={{ root: classes.tabRoot }}
              label={getResourceValueByKey(resource, "RELATIVE", "Relative")}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          {getAbsoluteDatePanel()}
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          {getRelativeDatePanel()}
        </TabPanel>{" "}
      </>
    );
  };

  const getAbsoluteDatePanel = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={materialTheme}>
          <DateTimePicker
            disableFuture
            // autoOk
            hideTabs
            variant="static"
            value={flag.from ? fromDate : toDate}
            onChange={(e) => handleChangeDate(e)}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  };

  const getRelativeDatePanel = () => {
    const getRoundToText = () => {
      switch (relativeDate.offsetBy) {
        case "Seconds ago":
        case "Seconds from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_SECOND",
            "Round to the second"
          );
          break;
        case "Minutes ago":
        case "Minutes from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_MINUTE",
            "Round to the minute"
          );
          break;
        case "Hours ago":
        case "Hours from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_HOUR",
            "Round to the hour"
          );
          break;
        case "Days ago":
        case "Days from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_DAY",
            "Round to the day"
          );
          break;
        case "Weeks ago":
        case "Weeks from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_WEEK",
            "Round to the week"
          );
          break;
        case "Months ago":
        case "Months from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_MONTH",
            "Round to the month"
          );
          break;
        case "Years ago":
        case "Years from now":
          return getResourceValueByKey(
            resource,
            "ROUND_TO_THE_YEAR",
            "Round to the year"
          );
          break;

        default:
          break;
      }
    };

    let selectedDate;
    let month, date, year, hour, minute, second, pm;

    if (flag.from) {
      selectedDate = fromDate === "" ? new Date() : fromDate;
    } else {
      selectedDate = toDate === "" ? new Date() : toDate;
    }

    [month, date, year] = selectedDate.toLocaleDateString().split("/");
    [hour, minute, second] = selectedDate
      .toLocaleTimeString()
      .slice(0, 7)
      .split(":");
    pm = selectedDate.getHours() >= 12 ? true : false;

    return (
      <Grid container direction="column">
        <Grid item className={classes.relativeDateContainer}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={5}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="caption" className={classes.greyish}>
                    {year}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" style={{ color: "white" }}>
                    {`${getMonthName(month)} ${date}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h3"
                align="center"
                className={classes.greyish}
              >
                {`${hour.padStart(2, "0")}:${minute}`}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    variant="caption"
                    style={{
                      color: pm ? "rgba(255, 255, 255, 0.54)" : "white",
                    }}
                  >
                    {getResourceValueByKey(resource, "AM", "AM")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    style={{
                      color: pm ? "white" : "rgba(255, 255, 255, 0.54)",
                    }}
                  >
                    {getResourceValueByKey(resource, "PM", "PM")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            className={classes.relativeDatePanel}
            alignItems="flex-end"
            justify="center"
          >
            <Grid
              item
              xs={2}
              sm={3}
              md={3}
              lg={4}
              className={classes.gridItems}
            >
              <TextField
                type="number"
                value={relativeDate.offset}
                className={classes.fullWidth}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={handleChangeOffset}
              />
            </Grid>
            <Grid
              item
              xs={10}
              sm={9}
              md={9}
              lg={8}
              className={classes.gridItems}
            >
              <Select
                className={classes.fullWidth}
                value={relativeDate.offsetBy}
                margin="dense"
                onChange={handleChangeOffsetBy}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ padding: "10px 0px 5px 0px" }}
            >
              <FormGroup>
                <FormControlLabel
                  classes={{ root: classes.formControlLabel }}
                  control={
                    <Switch
                      size="small"
                      color="primary"
                      checked={checked}
                      onChange={toggleChecked}
                    />
                  }
                  label={
                    <Typography variant="subtitle2">
                      {getRoundToText()}
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onEntered={updateIndicator}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{ paper: classes.popover }}
      >
        {open && getPopoverContent()}
      </Popover>

      <Grow in={true} timeout={500}>
        <Paper elevation={0}>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            className={classes.flexContainer}
          >
            <Grid item>
              <TextField
                onClick={(e) => {
                  handleOpenPopover(e, { from: true, to: false });
                }}
                style={{ minWidth: "108px" }}
                InputProps={{
                  style: { background: error ? "#ffabb9" : "none" },
                  endAdornment: fromDate !== "" && (
                    <InputAdornment position="end">
                      <Tooltip
                        title={getResourceValueByKey(
                          resource,
                          "CLEAR",
                          "Clear"
                        )}
                      >
                        <CloseIcon
                          onClick={(e) =>
                            handleClearInputClick(e, {
                              from: true,
                              to: false,
                            })
                          }
                          className={classes.closeIcon}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                label={getResourceValueByKey(resource, "FROM", "From")}
                value={fromDate.toLocaleString()}
              />
            </Grid>
            <Grid item>
              <RightArrow className={classes.icon} />
            </Grid>
            <Grid item>
              <TextField
                onClick={(e) => {
                  handleOpenPopover(e, { from: false, to: true });
                }}
                style={{ minWidth: "108px" }}
                InputProps={{
                  style: { background: error ? "#ffabb9" : "none" },
                  endAdornment: toDate !== "" && (
                    <InputAdornment position="end">
                      <Tooltip
                        title={getResourceValueByKey(
                          resource,
                          "CLEAR",
                          "Clear"
                        )}
                      >
                        <CloseIcon
                          onClick={(e) =>
                            handleClearInputClick(e, {
                              from: false,
                              to: true,
                            })
                          }
                          className={classes.closeIcon}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                label={getResourceValueByKey(resource, "TO", "To")}
                value={toDate.toLocaleString()}
              />
            </Grid>
            {!disableUpdateIcon && (
              <Grid item>
                <Button
                  onClick={filterResults}
                  className={classes.updateButton}
                  disabled={error || fromDate === "" || toDate === ""}
                >
                  <Tooltip
                    title={getResourceValueByKey(resource, "UPDATE", "Update")}
                  >
                    <UpdateIcon
                      color={
                        error
                          ? "error"
                          : fromDate === "" || toDate === ""
                          ? "disabled"
                          : "primary"
                      }
                      style={{
                        cursor: error ? "not-allowed" : "pointer",
                      }}
                      className={classes.updateIcon}
                    />
                  </Tooltip>
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grow>
    </>
  );
};

export default DateTimeFilter;
