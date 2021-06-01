import React from "react";
import resource from "../../../../resources/common.json";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { Card, CardContent, IconButton } from "@material-ui/core";
import { makeStyles, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  panelCard: {
    height: "100%",
    background: "transparent",
    padding: "6px 6px 6px 6px",
    borderRadius: "10px",
    backgroundColor: "rgba(74, 76, 81, 0.43)",
  },
  cardContent: {
    position: "relative",
    height: "100%",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  fullscreenIconButton: {
    position: "absolute",
    top: 6,
    right: 0,
    padding: 0,
    maxHeight: 50,
  },
  fullscreenIcon: {
    color: theme.palette.grey[400],
    fontSize: 26,
  },
}));

const StyledCard = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.panelCard}>
      <CardContent className={classes.cardContent}>
        <Tooltip title={getResourceValueByKey(resource, "EXPAND", "Expand")}>
          <IconButton className={classes.fullscreenIconButton}>
            <FullscreenIcon className={classes.fullscreenIcon} />
          </IconButton>
        </Tooltip>
        {children}
      </CardContent>
    </Card>
  );
};

export default StyledCard;
