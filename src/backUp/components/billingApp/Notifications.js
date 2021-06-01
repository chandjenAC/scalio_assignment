import React from "react";
import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import SocialActions from "./SocialActions";
import { env } from "../../ENV";
import DefaultAvatar from "../../images/DefaultAvatar.png";

const commonCardStyles = {
  flexWrap: "noWrap",
  boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
  padding: 12,
  borderRadius: 15,
};

const useStyles = makeStyles((theme) => ({
  firstCard: {
    ...commonCardStyles,
    margin: "10px 12px 20px 12px",
  },
  card: {
    ...commonCardStyles,
    margin: "20px 12px",
  },
  flexCont: { flexWrap: "noWrap" },
  flexGrow: { flexGrow: 1 },
  imgCont: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: "6px 6px 0px 0px",
    overflow: "hidden",
  },
  margin4: { margin: 4 },
  actionsCont: { marginTop: 8 },
  buttonRoot: { padding: "2px 12px" },
  buttonLabel: { fontWeight: 400, fontSize: 12 },
}));

const Notifications = (props) => {
  const { notifications } = props;

  const classes = useStyles();
  return notifications.map((item, index) => {
    let logoUrl;
    if (item.logoId) {
      const sessionId = JSON.parse(localStorage.getItem("yogiUserInfo"))
        .sessionId;
      logoUrl = `${env.DOC_MGMT_SRVC_DOC_RETRIEVE_URL}logo/${item.logoId}/${sessionId}`;
    }
    return (
      <Card
        key={index}
        className={index === 0 ? classes.firstCard : classes.card}
      >
        <Grid container className={classes.flexCont} justify="flex-start">
          <Grid item>
            <div className={classes.imgCont}>
              <img
                src={logoUrl ? logoUrl : DefaultAvatar}
                height="30px"
                width="30px"
                alt="companyLogo"
              />
            </div>
          </Grid>
          <Grid item className={classes.flexGrow}>
            <Typography
              variant="body2"
              align="left"
              className={classes.margin4}
            >
              {item.client}
            </Typography>
            <Typography
              variant="subtitle2"
              align="left"
              noWrap
              className={classes.margin4}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              align="left"
              noWrap
              className={classes.margin4}
            >
              {`${item.caption.label} ${item.caption.value}`}
            </Typography>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              className={classes.actionsCont}
            >
              <Grid item>
                <SocialActions />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => item.action(item)}
                  color="primary"
                  variant="outlined"
                  classes={{
                    label: classes.buttonLabel,
                    root: classes.buttonRoot,
                  }}
                >
                  {item.actionText}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  });
};

export default Notifications;
