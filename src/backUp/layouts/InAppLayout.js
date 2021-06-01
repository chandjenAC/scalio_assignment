import React from "react";
import { Slide, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    borderRadius: "25px 0px 0px 0px",
    margin: "auto",
  },
  headerCont: {
    minHeight: "7vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 16px",
    borderBottom: "1px solid lightgrey",
  },
  scrollCont: { height: "80vh", overflowY: "auto", paddingBottom: 10 },
}));

const InAppLayout = ({ header, mainSection }) => {
  const classes = useStyles();
  return (
    <Slide direction="right" in={true} timeout={300}>
      <Paper elevation={0} className={classes.fadePaper}>
        <div className={classes.headerCont}>{header}</div>
        <div className={classes.scrollCont}>{mainSection}</div>
      </Paper>
    </Slide>
  );
};

export default InAppLayout;
