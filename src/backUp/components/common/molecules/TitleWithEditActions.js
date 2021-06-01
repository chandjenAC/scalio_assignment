import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { Button, Grid, IconButton } from "@material-ui/core";
import resource from "../../../resources/common.json";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  actionsCont: { padding: 30 },
  helperTextCont: { flexWrap: "noWrap" },
  button: {
    padding: "4px 45px",
  },
  addIconPaper: {
    marginLeft: 8,
    height: 30,
    width: 30,
    borderRadius: 15,
    boxShadow: "1px 1px 5px 0px rgba(50, 50, 50, 0.75)",
    display: "grid",
    placeItems: "center",
  },
  iconButton: {
    padding: 0,
  },
}));

const TitleWithEditActions = ({
  title,
  onAddIconClick,
  onDelete,
  onApply,
  getApplyButtonDisable,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.actionsCont}
    >
      <Grid item>
        <Grid container alignItems="center" className={classes.helperTextCont}>
          <Grid item>
            <Typography variant="body2">{title}</Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.addIconPaper}>
              <IconButton
                className={classes.iconButton}
                onClick={onAddIconClick}
              >
                <AddIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={onDelete}
            >
              {getResourceValueByKey(resource, "DELETE", "Delete")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={onApply}
              disabled={getApplyButtonDisable()}
            >
              {getResourceValueByKey(resource, "APPLY", "Apply")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TitleWithEditActions;
