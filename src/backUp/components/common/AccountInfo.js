import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.main,
    padding: "4px 0px 0px 4px",
  },
}));

const AccountInfo = (props) => {
  const { accountInfo, keyObj } = props;
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle2" align="left" className={classes.subtitle}>
        {keyObj.displayName}
      </Typography>
      {keyObj.childAttributes.map((key, index) => {
        let keys = key.name.split(".");
        return (
          <React.Fragment key={index}>
            <Typography variant="subtitle2" align="left">
              {key.displayName}
            </Typography>
            <Typography variant="body2" align="left">
              {accountInfo[keys[0]][keys[1]].replace(/.(?=.{4})/g, "x")}
            </Typography>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default AccountInfo;
