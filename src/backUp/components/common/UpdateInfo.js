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

const UpdateInfo = (props) => {
  const { updateInfo, keyObj } = props;
  const classes = useStyles();
  Number.prototype.padLeft = function(base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || "0") + this : this;
  };

  return (
    <>
      <Typography variant="subtitle2" align="left" className={classes.subtitle}>
        {keyObj.displayName}
      </Typography>
      {keyObj.childAttributes.map((key, index) => {
        let d = new Date(updateInfo[key.name]);
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let dformat =
          [
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
            d.getFullYear(),
          ].join("/") +
          " " +
          hours +
          ":" +
          minutes +
          " " +
          ampm;
        // this is the date adjusted w.r.t browser specific locale
        // d = d.toUTCString(); => this can be given as value if what you need is date in GMT

        return (
          <LabelAndValue
            key={index}
            label={key.displayName}
            value={dformat}
            // value={
            //   <Moment parse="YYYY-MM-DD hh:mm">{updateInfo[key.name]}</Moment>
            // }
          />
        );
      })}
    </>
  );
};

export default UpdateInfo;
