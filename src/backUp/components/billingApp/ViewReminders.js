import React from "react";
import YogiIcon from "../../images/appIcons/yogiWebb.png";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Grid, Typography } from "@material-ui/core";

const ViewReminders = ({ resource, reminders }) => {
  return reminders.length > 0 ? (
    <Grid container>
      {reminders.map((reminder, index) => {
        return (
          <Grid item key={index}>
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item>
                <img src={YogiIcon} height="40px" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {getResourceValueByKey(
                    resource,
                    "YOGI_REMINDER",
                    "Yogi Reminder"
                  )}
                </Typography>
                <Typography variant="body2">{reminder}</Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <Typography variant="body2">
      {getResourceValueByKey(resource, "NO_REMINDERS!", "No reminders!")}
    </Typography>
  );
};

export default ViewReminders;
