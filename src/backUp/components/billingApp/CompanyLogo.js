import React from "react";
import { env } from "../../ENV";
import DefaultAvatar from "../../images/DefaultAvatar.png";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imgCont: {
    height: "80px",
    width: "80px",
    borderRadius: "40px",
    margin: "auto",
    overflow: "hidden",
  },
}));

const CompanyLogo = ({ logoId }) => {
  const classes = useStyles();

  let logoUrl;
  if (logoId) {
    const sessionId = JSON.parse(localStorage.getItem("yogiUserInfo"))
      .sessionId;
    logoUrl = `${env.DOC_MGMT_SRVC_DOC_RETRIEVE_URL}logo/${logoId}/${sessionId}`;
  }

  return (
    <div className={classes.imgCont}>
      <img
        src={logoUrl ? logoUrl : DefaultAvatar}
        height="80px"
        width="80px"
        alt="companyLogo"
      />
    </div>
  );
};

export default CompanyLogo;
