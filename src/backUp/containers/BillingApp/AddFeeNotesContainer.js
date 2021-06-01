import React, { useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import { useMutation } from "react-query";
import { addActivityNote } from "../../utils/getData";
import AddNoteForm from "../../components/billingApp/AddNoteForm";
import ViewNotes from "../../components/billingApp/ViewNotes";

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    minWidth: 250,
    maxWidth: 450,
    overflowX: "scroll",
    padding: "24px 8px 6px 8px",
    position: "relative",
  },
  addNoteButtonDiv: {
    width: "100%",
    position: "absolute",
    top: 4,
    right: 8,
  },
  addNoteButton: {
    float: "right",
  },
  addNoteDiv: { width: "100%" },
}));

const AddFeeNotesContainer = (props) => {
  const {
    resource,
    handleReloadTable,
    rowData,
    notes,
    viewNotes,
    anchorEl,
    handleClose,
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [addNote, setAddNote] = useState(false);

  const [addNoteMutation] = useMutation(addActivityNote, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleReloadTable();
    },
  });

  const handleClickCancelWithNoNotes = () => {
    handleClose();
  };

  const handleClickCancelWithNotes = () => {
    setAddNote(false);
  };

  return (
    <Popover
      classes={{ paper: classes.popoverPaper }}
      open={viewNotes}
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
      <Grid container direction="column">
        {addNote && (
          <Grid item className={classes.addNoteDiv}>
            <AddNoteForm
              resource={resource}
              entityId={rowData.id}
              addNoteMutation={addNoteMutation}
              handleClickCancel={handleClickCancelWithNotes}
            />
          </Grid>
        )}
        {notes && notes.length > 0 ? (
          <>
            {!addNote && (
              <Grid item className={classes.addNoteButtonDiv}>
                <Button
                  className={classes.addNoteButton}
                  color="primary"
                  onClick={() => setAddNote(true)}
                >
                  {getResourceValueByKey(resource, "ADD_NOTE", "Add Note")}
                </Button>
              </Grid>
            )}
            <ViewNotes resource={resource} notes={notes} />
          </>
        ) : (
          <Grid item>
            <AddNoteForm
              resource={resource}
              entityId={rowData.id}
              addNoteMutation={addNoteMutation}
              handleClickCancel={handleClickCancelWithNoNotes}
            />
          </Grid>
        )}
      </Grid>
    </Popover>
  );
};
export default AddFeeNotesContainer;
