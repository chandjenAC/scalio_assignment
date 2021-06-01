import React, { useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import AddStatementNotesContainer from "./AddStatementNotesContainer";
import LogPaymentPopUpContainer from "./LogPaymentPopUpContainer";

const useStyles = makeStyles((theme) => ({
  floatright: {
    float: "right",
    padding: "16px 52px",
  },
  buttonRoot: {
    padding: "10px 20px",
  },
  buttonText: {
    fontWeight: 400,
  },
}));
const AddNoteAndLogPaymentContainer = (props) => {
  const { resource, statementData, refetchStatementData } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [addNote, setAddNote] = useState(false);
  const [viewLogPayment, setViewLogPayment] = useState(false);

  const handleClick = (e, flag) => {
    if (flag === "addNote") {
      setAddNote(true);
    } else {
      setViewLogPayment(true);
    }
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (addNote) {
      setAddNote(false);
    }
    setViewLogPayment(false);
  };

  return (
    <div className={classes.floatright}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Button onClick={(e) => handleClick(e, "addNote")}>
            {getResourceValueByKey(resource, "ADD_A_NOTE", "Add a Note")}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.buttonRoot, label: classes.buttonText }}
            disabled={statementData.paidStatus === "Paid"}
            onClick={(e) => handleClick(e, "logPayment")}
          >
            {getResourceValueByKey(
              resource,
              "LOG_A_PAYMENT_RECEIVED",
              "Log a Payment Received"
            )}
          </Button>
        </Grid>
      </Grid>
      {addNote && (
        <AddStatementNotesContainer
          resource={resource}
          addNote={addNote}
          anchorEl={anchorEl}
          entityId={statementData.id}
          handleClose={handleClose}
          refetchStatementData={refetchStatementData}
        />
      )}
      {viewLogPayment && (
        <LogPaymentPopUpContainer
          resource={resource}
          viewLogPayment={viewLogPayment}
          anchorEl={anchorEl}
          statementData={statementData}
          handleClose={handleClose}
          refetchStatementData={refetchStatementData}
        />
      )}
    </div>
  );
};

export default AddNoteAndLogPaymentContainer;
