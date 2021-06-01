import React, { useState } from "react";
import ScrollableDialogBox from "../molecules/DialogBox/ScrollableDialogBox";
import resource from "../../../resources/common.json";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { IconButton, Tooltip } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import cloneDeep from "lodash/cloneDeep";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
  },
  addNewButton: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
    margin: "8px 0px 0px 20px",
  },
  gridContainer: {
    position: "relative",
    padding: 6,
    maxWidth: 950,
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justify: "center",
    minWidth: 250,
    padding: 0,
  },
  iconButton: {
    padding: 6,
  },
}));

const EditArrayInDialogueBox = (props) => {
  const { array, title, onChange } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [newArray, setNewArray] = useState(array || []);

  const onButtonClick = (e) => {
    e.stopPropagation();
    handleOpen(e);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    onChange(newArray);
    handleClose(e);
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "UPDATE", "Update"),
      handler: handleUpdate,
    },
  ];

  const handleItemValueChange = (e, index) => {
    let tempArray = cloneDeep(newArray);
    tempArray[index] = e.target.value;
    setNewArray(tempArray);
  };

  const addNew = () => {
    let tempArray = Array.isArray(newArray) ? cloneDeep(newArray) : [];
    tempArray.push("");
    setNewArray(tempArray);
  };

  const deleteItem = (index) => {
    let tempArray = cloneDeep(newArray);
    tempArray.splice(index, 1);
    setNewArray(tempArray);
  };

  return (
    <>
      <Button className={classes.button} onClick={(e) => onButtonClick(e)}>
        {getResourceValueByKey(resource, "CLICK_TO_EDIT", "Click to edit")}
      </Button>
      <ScrollableDialogBox
        open={open}
        handleClose={handleClose}
        title={title}
        dialogActions={dialogActions}
      >
        <Grid container className={classes.gridContainer}>
          {newArray?.map((value, index) => {
            return (
              <Grid item key={index} className={classes.gridItem}>
                <Typography variant="body2">
                  {`${index + 1}.`}&nbsp;&nbsp;
                </Typography>
                <TextField
                  variant="standard"
                  value={value}
                  onChange={(e) => handleItemValueChange(e, index)}
                />
                <Tooltip
                  title={getResourceValueByKey(resource, "DELETE", "Delete")}
                >
                  <IconButton
                    onClick={() => deleteItem(index)}
                    className={classes.iconButton}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Grid>
            );
          })}{" "}
        </Grid>
        <Button className={classes.addNewButton} onClick={() => addNew()}>
          {getResourceValueByKey(resource, "ADD_NEW", "Add New")}
        </Button>
      </ScrollableDialogBox>
    </>
  );
};

export default EditArrayInDialogueBox;
