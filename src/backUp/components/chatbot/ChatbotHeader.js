import React from "react";
import { ReactComponent as Logo } from "../../images/invertedYogiBot.svg";
import { Grid, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import VolumeIcon from "@material-ui/icons/VolumeUp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatbotHeaderRoot: {
    width: "100%",
    margin: "0px 6px",
    paddingRight: 4,
  },
  volumeIcon: {
    verticalAlign: "middle",
  },
}));
const ChatbotHeader = (props) => {
  const { resource, toggleFloating } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.chatbotHeaderRoot}
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Logo
              style={{
                paddingLeft: "2px",
                width: "45px",
                height: "45px",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              &nbsp; {getResourceValueByKey(resource, "HEY_I'M", "Hey I'm")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="primary">
              &nbsp;{getResourceValueByKey(resource, "YOGI", "Yogi")}
            </Typography>
          </Grid>
          <Grid item>
            &nbsp; <VolumeIcon className={classes.volumeIcon} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => toggleFloating()}>
          <CloseIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ChatbotHeader;
