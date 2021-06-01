import React, { useState } from "react";
import resource from "../../resources/policyApp.json";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { FormControl, InputLabel, Select, IconButton } from "@material-ui/core";
import { Button, MenuItem, Grid, makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  absoluteDiv: {
    position: "absolute",
    top: 12,
    right: 6,
  },
  select: {
    width: 150,
  },
}));

const PolicyEditOptions = (props) => {
  const {
    selectValue,
    viewPolicyEditOptions,
    policyOptions,
    criteriaOptions,
    onSelect,
    addNodeFn,
    addGraphNodes,
    handleCollapseGraph,
  } = props;
  const classes = useStyles();
  const [deleteNode, setDeleteNode] = useState(false);

  let selectOptions = viewPolicyEditOptions ? policyOptions : criteriaOptions;

  return (
    <div className={classes.absoluteDiv}>
      {!deleteNode && !addGraphNodes && (
        <>
          <Button
            onClick={() => {
              addNodeFn();
            }}
          >
            {viewPolicyEditOptions
              ? getResourceValueByKey(resource, "ADD_POLICY", "Add Policy")
              : getResourceValueByKey(resource, "ADD_CRITERIA", "Add Criteria")}
          </Button>
          <Button background="#fc1428" onClick={() => setDeleteNode(true)}>
            {viewPolicyEditOptions
              ? getResourceValueByKey(
                  resource,
                  "DELETE_POLICY",
                  "Delete Policy"
                )
              : getResourceValueByKey(
                  resource,
                  "DELETE_CRITERIA",
                  "Delete Criteria"
                )}
          </Button>
        </>
      )}
      {addGraphNodes && (
        <IconButton
          onClick={() => {
            handleCollapseGraph();
          }}
        >
          <ArrowBackIcon />
          {getResourceValueByKey(resource, "BACK", "Back")}
        </IconButton>
      )}
      {deleteNode && (
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <IconButton onClick={() => setDeleteNode(false)}>
              <ArrowBackIcon />
              {getResourceValueByKey(resource, "BACK", "Back")}
            </IconButton>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel>
                {viewPolicyEditOptions
                  ? getResourceValueByKey(
                      resource,
                      "SELECT_POLICY",
                      "Select Policy"
                    )
                  : getResourceValueByKey(
                      resource,
                      "SELECT_CRITERIA",
                      "Select Criteria"
                    )}
              </InputLabel>
              <Select
                className={classes.select}
                value={selectValue ? selectValue : ""}
                onChange={(e) => onSelect(e)}
              >
                {selectOptions.map((option, index) => {
                  return (
                    <MenuItem key={index} value={option.label}>
                      {option.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button background="#fc1428">
              {getResourceValueByKey(resource, "DELETE", "Delete")}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PolicyEditOptions;
