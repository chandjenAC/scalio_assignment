import React from "react";
import { makeStyles } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import { useMutation } from "react-query";
import { addStatementNote } from "../../utils/getData";
import AddNoteForm from "../../components/billingApp/AddNoteForm";

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    minWidth: 250,
    maxWidth: 450,
    overflowX: "scroll",
    padding: "24px 8px 6px 8px",
    position: "relative",
  },
}));

const AddStatementNotesContainer = (props) => {
  const {
    resource,
    entityId,
    addNote,
    anchorEl,
    handleClose,
    refetchStatementData,
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [addNoteMutation] = useMutation(addStatementNote, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleClose();
      refetchStatementData();
    },
  });

  return (
    <Popover
      classes={{ paper: classes.popoverPaper }}
      open={addNote}
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
      <AddNoteForm
        resource={resource}
        entityId={entityId}
        addNoteMutation={addNoteMutation}
        handleClickCancel={handleClose}
      />
    </Popover>
  );
};
export default AddStatementNotesContainer;
