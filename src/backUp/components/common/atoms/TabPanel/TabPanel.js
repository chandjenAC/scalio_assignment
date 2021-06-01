import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabPanelRoot: {
    width: "100%",
  },
  detailsBox: {
    padding: 0,
    width: "100%",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabPanelRoot}
      {...other}
    >
      {value === index && (
        <Box p={1} className={classes.detailsBox}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
