import React from "react";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import TriggerIcon from "@material-ui/icons/PlayArrow";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import SelectMolecule from "../common/molecules/SelectMolecule";

const useStyles = makeStyles((theme) => ({
  buttonText: {
    padding: "2px 0px",
  },
}));

const TriggerEvents = (props) => {
  const {
    resource,
    open,
    eventDate,
    handleButtonClick,
    handleChangeEventCode,
    handleChangeDate,
    eventCodeOptions,
    handleClose,
    dialogActions,
  } = props;
  const classes = useStyles();

  return (
    <>
      <Button
        onClick={handleButtonClick}
        color="primary"
        classes={{ text: classes.buttonText }}
      >
        <TriggerIcon color="primary" />
        {getResourceValueByKey(resource, "TRIGGER_EVENTS", "Trigger Events")}
      </Button>
      <DialogBox
        open={open}
        handleClose={handleClose}
        dialogActions={dialogActions}
        title={getResourceValueByKey(
          resource,
          "SELECT_EVENT_DATE",
          "Select Event Date"
        )}
      >
        <Grid container alignItems="flex-end" justify="center" spacing={2}>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                format="yyyy/MM/dd"
                value={eventDate || null}
                onChange={(e) => handleChangeDate(e)}
                label={getResourceValueByKey(
                  resource,
                  "EVENT_DATE",
                  "Event Date"
                )}
                clearable
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <SelectMolecule
              minWidth={150}
              label={getResourceValueByKey(
                resource,
                "EVENT_CODE",
                "Event Code"
              )}
              onChange={handleChangeEventCode}
              options={eventCodeOptions}
            />
          </Grid>
        </Grid>
      </DialogBox>
    </>
  );
};

export default TriggerEvents;
