import React, { useState, useEffect } from "react";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import { Paper, Grid, Button, ListItem } from "@material-ui/core";
import { ListItemText, List, Typography } from "@material-ui/core";
import DraggableList from "../common/molecules/DraggableList";
import { reorder } from "../../utils";
import Loader from "../common/atoms/Loaders/Loader";
import { makeStyles, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import EditIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import UpdateIcon from "@material-ui/icons/Check";
import EditableListItem from "../common/molecules/EditableListItem";
import cloneDeep from "lodash/cloneDeep";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    padding: "10px 6px 0px 16px",
  },
  paperGridItem: {
    marginLeft: "42px",
    padding: "6px 12px",
    backgroundColor: "#f4f4f4",
    width: "450px",
    position: "relative",
  },
  paper: {
    minHeight: "100px",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  updateButton: {
    position: "absolute",
    top: 12,
    right: 16,
    zIndex: 9,
  },
  editActionsContainer: {
    position: "absolute",
    width: "fit-content",
    top: 12,
    right: 16,
    zIndex: 9,
  },
  editButton: {
    position: "absolute",
    minWidth: 32,
    top: 12,
    right: 16,
    zIndex: 9,
  },
  button: {
    minWidth: 32,
  },
}));

const GetandEditProcessSteps = (props) => {
  const [stepsResponse, setStepsResponse] = useState(null);
  const [steps, setSteps] = useState(null); //with added attributes primary and secondary for rendering List
  const [dragged, setDragged] = useState(false);
  const [editSteps, setEditSteps] = useState(false);

  const { resource, rowData } = props;
  const classes = useStyles();
  const stepsRef = cloneDeep(steps);

  useEffect(() => {
    const getSteps = async () => {
      let body = {
        id: rowData.id,
        name: rowData.processName,
      };
      let response = await post(env.PROCESS_STEP_META_SEARCH, body);
      setStepsResponse(response.data);
      addAttrs(response.data.steps);
    };
    getSteps();
  }, []);

  const addAttrs = (data) => {
    let tempData = cloneDeep(data);
    tempData.map((item) => {
      item.primary = item.stepName;
      item.secondary = `${getResourceValueByKey(
        resource,
        "FN._HANDLER",
        "Fn. Handler"
      )}: ${
        item.fnhandler
          ? item.fnhandler
          : getResourceValueByKey(resource, "NONE", "None")
      }`;
    });
    setSteps(tempData);
  };

  const onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;
    const newSteps = reorder(steps, source.index, destination.index);
    setSteps(newSteps);
    setDragged(true);
  };

  const updateSteps = async () => {
    stepsRef.map((step) => {
      delete step.primary;
      delete step.secondary;
    });

    let body = cloneDeep(stepsResponse);
    body.steps = stepsRef;
    // await post(env.PROCESS_STEP_META_UPDATE, body);
    addAttrs(stepsRef);
    setEditSteps(false);
    setDragged(false);
  };

  const handleCancelOrdering = () => {
    setDragged(false);
    addAttrs(stepsResponse.steps);
  };

  const getCancelUpdateActions = (cancelFn, updateFn) => {
    return (
      <Grid container className={classes.editActionsContainer}>
        <Grid item>
          <Tooltip title={getResourceValueByKey(resource, "CANCEL", "Cancel")}>
            <Button
              color="primary"
              onClick={cancelFn}
              className={classes.button}
            >
              <CloseIcon color="error" />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title={getResourceValueByKey(resource, "UPDATE", "Update")}>
            <Button
              color="primary"
              onClick={updateFn}
              className={classes.button}
            >
              <UpdateIcon color="primary" />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    );
  };

  const renderDraggableSteps = () => {
    return (
      <>
        {dragged ? (
          getCancelUpdateActions(handleCancelOrdering, updateSteps)
        ) : (
          <Tooltip
            title={getResourceValueByKey(resource, "EDIT_STEPS", "Edit steps")}
          >
            <Button
              className={classes.editButton}
              color="primary"
              onClick={() => setEditSteps(true)}
            >
              <EditIcon color="primary" />
            </Button>
          </Tooltip>
        )}
        <DraggableList items={steps} onDragEnd={onDragEnd} />
      </>
    );
  };

  const onChangePrimary = (value, index) => {
    stepsRef[index].stepName = value;
  };

  const onChangeSecondary = (value, index) => {
    stepsRef[index].fnhandler = value;
  };

  const handleCancelEditing = () => {
    setEditSteps(false);
  };

  const renderEditableSteps = () => {
    return (
      <>
        {getCancelUpdateActions(handleCancelEditing, updateSteps)}
        <List>
          {steps.map((step, index) => {
            return (
              <EditableListItem
                key={index}
                item={step}
                index={index}
                onChangePrimary={onChangePrimary}
                onChangeSecondary={onChangeSecondary}
              />
            );
          })}
        </List>
      </>
    );
  };

  const renderSteps = () => {
    return (
      <List>
        {steps.map((step, index) => {
          return (
            <ListItem key={index}>
              <ListItemText
                style={{ fontSize: "0.875rem" }}
                primary={step.primary}
                secondary={step.secondary}
              />
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Grid container alignItems="flex-start">
      <Grid item className={classes.paperGridItem}>
        <Paper className={classes.paper}>
          <Typography
            variant="body1"
            color="primary"
            className={classes.subtitle}
          >
            {getResourceValueByKey(resource, "PROCESS_FLOWS", "Process Flows")}
          </Typography>
          {steps ? (
            stepsResponse.editable ? (
              editSteps ? (
                renderEditableSteps()
              ) : (
                renderDraggableSteps()
              )
            ) : (
              renderSteps()
            )
          ) : (
            <div className={classes.centerDiv}>
              <Loader />
            </div>
          )}
        </Paper>
      </Grid>
      <Grid item style={{ padding: "24px 12px 12px 12px" }}>
        {steps ? (
          !editSteps && (
            <Typography variant="body2" color="primary">
              <span style={{ color: "black" }}>
                {stepsResponse.editable
                  ? getResourceValueByKey(resource, "INFO:", "Info:")
                  : getResourceValueByKey(resource, "NOTE:", "Note:")}
              </span>
              &nbsp;
              {stepsResponse.editable
                ? getResourceValueByKey(
                    resource,
                    "DRAG_AND_DROP_INFO",
                    "Drag and drop info"
                  )
                : getResourceValueByKey(
                    resource,
                    "STEPS_CAN'T_BE_EDITED!",
                    "Steps cannot be edited!"
                  )}
            </Typography>
          )
        ) : (
          <Loader size={10} />
        )}
      </Grid>
    </Grid>
  );
};

export default GetandEditProcessSteps;
