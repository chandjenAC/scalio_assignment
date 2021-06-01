import React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import resource from "../../../resources/common.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  copyContainer: {
    flexWrap: "noWrap",
  },
  icon: {
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  button: {
    minWidth: 20,
    padding: "0px 12px",
  },
}));

const TruncateAndCopy = (props) => {
  const { value, truncate, copy } = props;
  const successMsg = getResourceValueByKey(
    resource,
    "SUCCESSFULLY_COPIED!",
    "Successfully Copied!"
  );
  const variant = "success";

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Grid
      container
      alignItems="center"
      justify="flex-start"
      className={classes.copyContainer}
    >
      <Grid item>
        {value && truncate && value.length > 22 ? (
          <Tooltip title={value}>
            <Typography
              variant="caption"
              style={{ fontWeight: 600 }}
              align="left"
            >{`${value.substring(0, 5)}...${value.substring(
              value.length - 5,
              value.length
            )}`}</Typography>
          </Tooltip>
        ) : (
          <Typography
            variant="caption"
            style={{ fontWeight: 600 }}
            align="left"
          >
            {value}
          </Typography>
        )}
      </Grid>
      {copy && (
        <Grid item onClick={(e) => e.stopPropagation()}>
          <CopyToClipboard
            text={value}
            onCopy={() => enqueueSnackbar(successMsg, { variant })}
          >
            <IconButton className={classes.button}>
              <Tooltip title={getResourceValueByKey(resource, "COPY", "Copy")}>
                <CopyIcon className={classes.icon} />
              </Tooltip>
            </IconButton>
          </CopyToClipboard>
        </Grid>
      )}
    </Grid>
  );
};

export default TruncateAndCopy;
