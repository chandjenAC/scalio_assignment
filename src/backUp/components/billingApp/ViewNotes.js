import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  notesMainCont: { maxHeight: 275, overflowY: "scroll" },
  noteCont: {
    margin: "6px 0px",
  },
  addedBy: {
    padding: "0px 6px",
  },
  msgGridItem: {
    width: "fit-content",
    background: theme.palette.primary.light,
    padding: "6px 16px",
    borderRadius: 8,
  },
}));

const ViewNotes = (props) => {
  const { resource, notes } = props;

  const classes = useStyles();
  return (
    <Box className={classes.notesMainCont}>
      {notes && notes.length > 0 ? (
        notes.map((note, index) => {
          return (
            <Grid item key={index}>
              <Grid container direction="column" className={classes.noteCont}>
                <Grid item className={classes.addedBy}>
                  <Grid container>
                    <Grid item>
                      <Typography variant="subtitle2">
                        {note.addedBy}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" color="textSecondary">
                        &nbsp;&nbsp; &nbsp;
                        {`@${format(
                          new Date(note.addedOn),
                          "MM-dd-yyyy'T'HH:mm:ssxxx"
                        )}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.msgGridItem}>
                  <Typography variant="body2">{note.message}</Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Typography variant="body2" align="center">
          {getResourceValueByKey(
            resource,
            "NO_NOTES_ADDED!",
            "No notes added!"
          )}
        </Typography>
      )}
    </Box>
  );
};

export default ViewNotes;
