import React, { useState } from "react";
import { Box, Button, Divider } from "@material-ui/core";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles, Popover, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";
import resource from "../../../../resources/common.json";
import SelectMolecule from "../SelectMolecule";
import AsyncPaginatedSelect from "../../../../containers/Common/AsyncPaginatedSelect";
import AggregateAndFilterContainer from "../../../../containers/Common/AggregateAndFilterContainer";
import DateTimeFilter from "./DateTimeFilter";
import { format, parseISO } from "date-fns";
import DateRangeFilter from "./DateRangeFilter";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "1px 6px",
    textAlign: "left",
    background: theme.palette.common.white,
    "&:hover": {
      background: theme.palette.grey[400],
    },
  },
  buttonVariantText: {
    textAlign: "left",
    // color: theme.palette.grey[400],
    color: theme.palette.grey[900],
    border: "1px solid lightgrey",
  },
  popoverPaper: {
    padding: 12,
    overflow: "visible",
  },
  selectMoleculeItem: { padding: 0, minWidth: 150 },
  divider: {
    width: 100,
    height: 2,
    background: theme.palette.common.black,
  },
  activeFilterCont: {
    // border: "1px solid lightgrey",
    width: "fit-content",
    borderRadius: 5,
    padding: "1px 3px 1px 6px",
    background: theme.palette.primary.main,
    cursor: "pointer",
  },
  iconButton: { padding: 0 },
  closeIcon: {
    color: theme.palette.common.white,
    marginLeft: 4,
    marginBottom: 1,
  },
  activeFilterText: {
    color: theme.palette.common.white,
  },
  inactiveFilterBox: {
    width: "fit-content",
  },
  fullWidth: {
    width: "100%",
  },
}));

const FilterButton = (props) => {
  //possible values for filterTypes=> "select", "asyncPaginatedSelect","aggregateSelect","date/time","children"
  const {
    filterType,
    loadOptions,
    initialOptions,
    placeholder,
    aggregateSelect,
    displayName,
    popoverTitle,
    filterValue,
    selectLabel,
    defaultValue,
    selectOptions,
    handleApplyFilter,
    clearFilter,
    typoSize,
    disableFilter,
  } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const [selectedDateTime, setSelectedDateTime] = useState({
    gte: null,
    lte: null,
  });

  const handleClick = (event) => {
    if (!disableFilter) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickApply = () => {
    handleClose();
    if (["date/time", "dateRange"].includes(filterType)) {
      handleApplyFilter(selectedDateTime);
      setSelectedDateTime({ gte: null, lte: null });
    } else {
      handleApplyFilter(selectedValue);
      setSelectedValue("");
    }
  };

  const open = Boolean(anchorEl);

  const handleClearFilter = (e) => {
    e.stopPropagation();
    clearFilter();
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const getFromDate = (date) => {
    setSelectedDateTime({ ...selectedDateTime, gte: date });
  };

  const getToDate = (date) => {
    setSelectedDateTime({ ...selectedDateTime, lte: date });
  };

  const getApplyButtonDisable = () => {
    if (["date/time", "dateRange"].includes(filterType)) {
      if (!selectedDateTime.gte && !selectedDateTime.lte) {
        return true;
      }
    } else if (!selectedValue) {
      return true;
    }
    return false;
  };

  const getFilterByFilterType = () => {
    switch (filterType) {
      case "select":
        return (
          <SelectMolecule
            label={selectLabel}
            defaultValue={defaultValue}
            onChange={handleSelectChange}
            options={selectOptions}
          />
        );
      case "multiSelect":
        return (
          <AsyncPaginatedSelect
            isMulti={true}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleSelectChange}
            initialOptions={selectOptions}
          />
        );
      case "asyncPaginatedSelect":
        return (
          <AsyncPaginatedSelect
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleSelectChange}
            loadOptions={loadOptions}
            initialOptions={initialOptions}
          />
        );
      case "aggregateSelect":
        return (
          <AggregateAndFilterContainer
            placeholder={placeholder}
            serverName={aggregateSelect.serverName}
            indexName={aggregateSelect.indexName}
            field={aggregateSelect.field}
            onChange={handleSelectChange}
          />
        );
      case "date/time":
        return (
          <DateTimeFilter
            disableUpdateIcon={true}
            getFromDate={getFromDate}
            getToDate={getToDate}
            defaultFromDate={selectedDateTime.gte}
            defaultToDate={selectedDateTime.lte}
          />
        );
      case "dateRange":
        return (
          <DateRangeFilter
            disableUpdateIcon={true}
            getFromDate={getFromDate}
            getToDate={getToDate}
            gte={selectedDateTime.gte || filterValue.gte}
            lte={selectedDateTime.lte || filterValue.lte}
          />
        );

      default:
        return "";
    }
  };

  const getMultiSelectFilterValue = () => {
    let value;
    if (filterValue.length > 2) {
      value = `${filterValue[0]},${filterValue[1]}(+${filterValue.length - 2})`;
    } else {
      value = filterValue.join(",");
    }
    return getFilterValueInBox(value);
  };

  const getFilterValueInBox = (value) => {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.activeFilterCont}
        onClick={handleClick}
      >
        <Grid item>
          <Typography
            variant={typoSize === "small" ? "caption" : "body2"}
            className={classes.activeFilterText}
          >
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            disabled={disableFilter}
            onClick={handleClearFilter}
            className={classes.iconButton}
          >
            <Tooltip
              title={
                disableFilter
                  ? ""
                  : getResourceValueByKey(
                      resource,
                      "REMOVE_FILTER",
                      "Remove filter"
                    )
              }
            >
              <CloseIcon fontSize="small" className={classes.closeIcon} />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Popover
        classes={{ paper: classes.popoverPaper }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="space-between"
          spacing={1}
          className={classes.popoverContent}
        >
          <Grid item className={classes.fullWidth}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="subtitle1" align="left">
                  {popoverTitle}
                </Typography>
              </Grid>
              <Grid item>
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.selectMoleculeItem}>
            {getFilterByFilterType()}
          </Grid>
          <Grid item className={classes.fullWidth}>
            <Grid container justify="space-between">
              <Grid item>
                <Button onClick={handleClose} size="small" variant="text">
                  {getResourceValueByKey(resource, "CANCEL", "Cancel")}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleClickApply}
                  size="small"
                  color="primary"
                  variant="text"
                  disabled={getApplyButtonDisable()}
                >
                  {getResourceValueByKey(resource, "APPLY", "Apply")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
      {/* if filterValue is present, then highlight the selected filter value , else, render display name  */}
      {typeof filterValue === "object" &&
      (filterValue.gte || filterValue.lte) ? (
        filterType === "dateRange" ? (
          filterValue.gte && filterValue.lte ? (
            getFilterValueInBox(
              `${format(
                new Date(parseISO(filterValue.gte)),
                "MM/dd/yyyy"
              )} to ${format(
                new Date(parseISO(filterValue.lte)),
                "MM/dd/yyyy"
              )}`
            )
          ) : filterValue.gte ? (
            getFilterValueInBox(
              `${format(
                new Date(parseISO(filterValue.gte)),
                "MM/dd/yyyy"
              )} to ${format(new Date(), "MM/dd/yyyy")}`
            )
          ) : filterValue.lte ? (
            getFilterValueInBox(
              `${format(
                new Date(parseISO("19700101")),
                "MM/dd/yyyy"
              )} to ${format(
                new Date(parseISO(filterValue.lte)),
                "MM/dd/yyyy"
              )}`
            )
          ) : (
            ""
          )
        ) : (
          getFilterValueInBox(
            `${new Date(
              parseISO(filterValue.gte)
            ).toLocaleString()} to ${new Date(
              parseISO(filterValue.lte)
            ).toLocaleString()}`
          )
        )
      ) : filterType === "multiSelect" &&
        Array.isArray(filterValue) &&
        filterValue.length > 0 ? (
        getMultiSelectFilterValue()
      ) : typeof filterValue !== "object" && filterValue ? (
        getFilterValueInBox(filterValue)
      ) : (
        <Box className={classes.inactiveFilterBox}>
          <Button
            classes={{ text: classes.buttonVariantText }}
            className={classes.button}
            size="small"
            color="primary"
            disabled={disableFilter}
            onClick={handleClick}
            size="small"
            variant={
              typeof filterValue === "object" &&
              filterValue.gte &&
              filterValue.lte
                ? "contained"
                : typeof filterValue !== "object" && filterValue
                ? "contained"
                : open
                ? "outlined"
                : "text"
            }
          >
            {displayName}
          </Button>
        </Box>
      )}
    </>
  );
};

export default FilterButton;
