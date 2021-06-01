import React, { useState, useEffect } from "react";
import { post } from "../../utils/callApi";
import { retrieveTokenBody } from "../../utils/getPayloads/tokenPayloads";
import Rating from "@material-ui/lab/Rating";
import AvatarLogoBorder from "../../images/AvatarLogoBorder";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { env } from "../../ENV";

const useStyles = makeStyles((theme) => ({
  mainCont: {
    flexWrap: "noWrap",
  },
  textGridItem: {
    padding: "4px",
  },
  companyName: {
    fontWeight: "500",
  },
  type: {
    fontSize: "10px",
    fontWeight: "700",
  },
  countryCode: {
    display: "inline-block",
    marginTop: "3px",
    marginLeft: "4px",
  },
}));

const Avatar = ({ avatar, size }) => {
  const [avatarInfo, setAvatarInfo] = useState(null);
  const classes = useStyles();

  let isMounted; // memory leak fix
  let logoId;
  let logoUrl;
  let noOfLabels = avatar.labels.length;
  let isAvatar = false;

  useEffect(() => {
    async function getAvatarDetails() {
      isMounted = true;
      let token = { id: avatar.avatarId, type: "avatar" };
      let body = retrieveTokenBody({ id: token.id, type: token.type });
      let tokenData = await post(env.TOKEN_RETRIEVE_URL, body);
      if (isMounted) {
        setAvatarInfo(tokenData.data);
      }
    }
    getAvatarDetails();
    return () => {
      isMounted = false;
    };
  }, [avatar]);

  if (avatarInfo && typeof avatarInfo === "object") {
    isAvatar = true;
    logoId = avatarInfo?.faces?.[0]?.logoId;
    if (logoId) {
      const sessionId = JSON.parse(localStorage.getItem("yogiUserInfo"))
        .sessionId;
      logoUrl = `${env.DOC_MGMT_SRVC_DOC_RETRIEVE_URL}logo/${logoId}/${sessionId}`;
    }
  }

  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      className={classes.mainCont}
    >
      <Grid item>
        <AvatarLogoBorder
          url={logoUrl}
          width={size === "small" ? 38 : 68}
          height={size === "small" ? 39 : 69}
        />
      </Grid>
      <Grid item className={classes.textGridItem}>
        {size !== "small" &&
          (isAvatar ? (
            <Grid container justify="flex-start">
              {avatar.labels.map((label, index) => {
                return (
                  <Grid item key={index}>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                      align="left"
                      // className={classes.type}
                    >
                      {noOfLabels === index + 1
                        ? label.toUpperCase()
                        : `${label.toUpperCase()},`}
                      &nbsp;
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="left"
              className={classes.type}
            >
              {"TYPE"}
            </Typography>
          ))}

        <Typography
          variant={size === "small" ? "caption" : "body1"}
          color={size === "small" ? "initial" : "primary"}
          align="left"
          // className={classes.companyName}
        >
          {isAvatar ? avatarInfo?.tokenDisplayName : "Company Name"}
        </Typography>
        <Grid container justify="flex-start">
          <Grid item>
            <Rating
              precision={0.5}
              size={size === "small" ? "small" : "medium"}
              readOnly
              value={
                avatarInfo ?.scores ?.[0] ?.rating
                  ? avatarInfo ?.scores[0].rating
                    : 0
              }
            />
          </Grid>
          {size !== "small" && (
            <Grid item>
              <Typography variant={"body2"} className={classes.countryCode}>
                {isAvatar ? avatarInfo?.postalAddress?.countryCode : "IN"}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Avatar);
