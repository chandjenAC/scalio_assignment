import React from "react";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import SettingsIcon from "@material-ui/icons/Settings";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles, InputLabel, FormControl } from "@material-ui/core";
import { Switch, FormControlLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControlLabelRoot: {
    marginRight: 0,
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    textAlign: "left",
  },
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
    maxWidth: "40px",
  },
  error: {
    display: "inline-block",
    paddingTop: 25,
  },
  icon: {
    fontSize: 23,
  },
}));

const AuthnSettings = (props) => {
  const {
    resource,
    trace,
    handleChangeTrace,
    loglevel,
    handleChangeLogLevel,
    loglevelOptions,
    cancelEdit,
    updateAuthSettings,
  } = props;
const classes=useStyles()
  const [open, setOpen] = React.useState(false);

  const onButtonClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setOpen(false);
    cancelEdit();
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    setOpen(false);
    updateAuthSettings();
  };

  const dialogActions = [
    {
      text: getResourceValueByKey(resource, "CANCEL", "Cancel"),
      handler: handleCancel,
    },
    {
      text: getResourceValueByKey(resource, "UPDATE", "Update"),
      handler: handleUpdate,
    },
  ];

  return (
    <>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item>
          <IconButton onClick={(e) => onButtonClick(e)}>
            <SettingsIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <DialogBox
        open={open}
        handleClose={handleCancel}
        title={getResourceValueByKey(resource, "SETTINGS", "Settings")}
        dialogActions={dialogActions}
      >
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <FormControlLabel
              classes={{ root: classes.formControlLabelRoot }}
              control={
                <Switch
                  size="small"
                  checked={trace}
                  onChange={handleChangeTrace}
                  color="primary"
                  name="trace"
                />
              }
              label={
                <Typography variant="body2">
                  {getResourceValueByKey(resource, "TRACE", "Trace")}
                </Typography>
              }
            />
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel>
                {getResourceValueByKey(resource, "LOG_LEVEL", "Log Level")}
              </InputLabel>
              <Select
                value={loglevel}
                classes={{ root: classes.select }}
                onChange={handleChangeLogLevel}
              >
                {loglevelOptions.map((loglevel, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {loglevel}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="caption" color="error" className={classes.error}>
          {getResourceValueByKey(
            resource,
            "SETTINGS_WARNING",
            "*Changes will be global"
          )}
        </Typography>
      </DialogBox>
    </>
  );
};

export default AuthnSettings;
