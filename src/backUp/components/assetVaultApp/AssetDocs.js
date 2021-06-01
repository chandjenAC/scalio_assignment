import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import SelectMolecule from "../common/molecules/SelectMolecule";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "30px 8px 10px 24px",
  },
  selectContainer: {
    marginTop: 24,
    paddingLeft: 25,
  },
  result: {
    margin: "25px 8px 8px 24px",
  },
  box: {
    maxHeight: 675,
    overflow: "scroll",
  },
}));

const AssetDocs = (props) => {
  const {
    resource,
    defOptions,
    selectedDef,
    handleChangeDef,
    indexOptions,
    selectedIndex,
    handleChangeIndex,
    operatorOptions,
    selectedOperator,
    handleChangeOperator,
    queryText,
    handleChangeQueryText,
    selectedIndexType,
    handleChangeDate,
    queryTextGte,
    queryTextLte,
    handleChangeQueryTextGte,
    handleChangeQueryTextLte,
    handleChangeDateGte,
    handleChangeDateLte,
    onSearch,
    searchResult,
  } = props;

  const classes = useStyles();

  const getHighAndLowFields = () => {
    return selectedIndexType === "float" ? (
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            type={"number"}
            label={getResourceValueByKey(
              resource,
              "GREATER_THAN",
              "Greater than"
            )}
            value={queryTextGte}
            onChange={(e) => handleChangeQueryTextGte(e)}
            disabled={!selectedOperator || !selectedIndex}
          />
        </Grid>
        <Grid item>
          <TextField
            type={"number"}
            label={getResourceValueByKey(resource, "LESS_THAN", "Less than")}
            value={queryTextLte}
            onChange={(e) => handleChangeQueryTextLte(e)}
            disabled={!selectedOperator || !selectedIndex}
          />
        </Grid>
      </Grid>
    ) : selectedIndexType === "date" ? (
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              format="yyyy/MM/dd"
              value={queryTextGte || null}
              onChange={(e) => handleChangeDateGte(e)}
              label={getResourceValueByKey(
                resource,
                "GREATER_THAN",
                "Greater than"
              )}
              clearable
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              format="yyyy/MM/dd"
              value={queryTextLte || null}
              onChange={(e) => handleChangeDateLte(e)}
              label={getResourceValueByKey(resource, "LESS_THAN", "Less than")}
              clearable
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    ) : null;
  };

  const getSearchField = () => {
    if (selectedOperator === "range") {
      return getHighAndLowFields();
    } else {
      return selectedIndexType === "float" ? (
        <TextField
          type={"number"}
          label={getResourceValueByKey(resource, "SEARCH", "Search")}
          value={queryText}
          onChange={(e) => handleChangeQueryText(e)}
          disabled={!selectedOperator || !selectedIndex}
        />
      ) : selectedIndexType === "date" ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            format="yyyy/MM/dd"
            value={queryText || null}
            onChange={(e) => handleChangeDate(e)}
            label={getResourceValueByKey(resource, "SEARCH", "Search")}
            clearable
          />
        </MuiPickersUtilsProvider>
      ) : (
        <TextField
          label={getResourceValueByKey(resource, "SEARCH", "Search")}
          value={queryText}
          onChange={(e) => handleChangeQueryText(e)}
          disabled={!selectedOperator || !selectedIndex}
        />
      );
    }
  };

  return (
    <>
      <Grid
        container
        className={classes.selectContainer}
        alignItems="flex-end"
        spacing={3}
      >
        <Grid item>
          <SelectMolecule
            label={getResourceValueByKey(
              resource,
              "SELECT_DEFINTION",
              "Select Defintion"
            )}
            // value={selectedDef}
            onChange={handleChangeDef}
            options={defOptions}
          />
        </Grid>
        <Grid item>
          <SelectMolecule
            label={getResourceValueByKey(resource, "SEARCH_BY", "Search By")}
            // value={selectedIndex}
            onChange={handleChangeIndex}
            options={indexOptions?.[selectedDef] || []}
            disabled={!selectedDef}
          />
        </Grid>
        <Grid item>
          <SelectMolecule
            label={getResourceValueByKey(
              resource,
              "SELECT_OPERATOR",
              "Select Operator"
            )}
            // value={selectedOperator}
            onChange={handleChangeOperator}
            // options={operatorOptions[selectedIndexType] || []}
            options={operatorOptions}
            disabled={!selectedIndex}
          />
        </Grid>
        <Grid item>{getSearchField()}</Grid>
        <Grid item>
          <Button
            onClick={() => onSearch()}
            size="small"
            color="primary"
            variant="contained"
            disabled={
              !selectedDef || !selectedIndex || !selectedOperator || !queryText
            }
          >
            {getResourceValueByKey(resource, "SEARCH_VAULT", "Search Vault")}
          </Button>
        </Grid>
      </Grid>
      {searchResult &&
        (searchResult.length > 0 ? (
          <>
            <Typography variant="body1" className={classes.title} align="left">
              {getResourceValueByKey(
                resource,
                "MATCHING_RESULTS:",
                "Matching results:"
              )}
            </Typography>
            <Box className={classes.box}>
              {searchResult.map((result, index) => {
                return (
                  <div key={index}>
                    <Typography
                      variant="body2"
                      className={classes.result}
                      align="left"
                    >
                      {getResourceValueByKey(resource, "ID", "ID")}: {result.id}
                    </Typography>
                  </div>
                );
              })}
            </Box>
          </>
        ) : (
          <Typography
            variant="body2"
            color="error"
            className={classes.result}
            align="left"
          >
            {getResourceValueByKey(
              resource,
              "NO_MATCHING_RESULTS!",
              "No matching results!"
            )}
          </Typography>
        ))}
    </>
  );
};

export default AssetDocs;
