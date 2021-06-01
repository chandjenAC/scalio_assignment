import React from "react";
import LabelAndValue from "./LabelAndValue";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.grey[500],
    padding: "4px 0px 0px 4px",
  },
}));

const DLTinfo = (props) => {
  const { dltInfo, keyObj } = props;
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle2" align="left" className={classes.subtitle}>
        {keyObj.displayName}
      </Typography>
      {keyObj.childAttributes.map((key, index) => {
        return (
          dltInfo[key.name] && (
            <React.Fragment key={index}>
              <LabelAndValue
                key={index}
                label={key.displayName}
                value={dltInfo[key.name]}
              />
            </React.Fragment>
          )
        );
      })}
    </>
  );
};

export default DLTinfo;
