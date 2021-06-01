import React from "react";
import Avatar from "../common/Avatar";
import RenderAttributes from "../../utils/RenderAttributes";
import RecursiveRenderAttributes from "../../utils/RecursiveRenderAttributes";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import mapValues from "lodash/mapValues";
import isEmpty from "lodash/isEmpty";
import groupBy from "lodash/groupBy";

const useStyles = makeStyles((theme) => ({
  attrsContainer: {
    paddingTop: "12px",
    maxHeight: "680px",
    overflowY: "scroll",
  },
  typoGraphAttr: {
    color: theme.palette.grey[500],
  },
  typotitle: {
    color: theme.palette.primary.main,
  },
}));

const WhiteListedData = ({ resource, data, uiMeta, tokenData }) => {
  const classes = useStyles();
  let keysToRender = uiMeta && uiMeta["whitelist-attributes"];
  let attr;
  let keysGroupedByAvatar;
  let avatarKeys;
  let keysExceptAvatarKeys;
  let allAvatars = [];
  let avatarNames = [];

  keysGroupedByAvatar = mapValues(groupBy(keysToRender, "avatar"));
  avatarKeys = keysGroupedByAvatar.true; // contains all the avatar whitelist keys
  keysExceptAvatarKeys = keysGroupedByAvatar[undefined]; // contains whitelist keys other than Avatars

  //groups the labels if Avatar acts as more than one type eg: if an Avatar named DLF acts as both FUNDER and SUPPLIER...(FUNDER and SUPPLIER are the labels grouped)
  if (!isEmpty(avatarKeys)) {
    avatarKeys.map((keyObj) => {
      attr = keyObj.name;
      if (data.hasOwnProperty(attr)) {
        if (avatarNames.includes(data[attr].tokenDisplayName)) {
          allAvatars.map((avatar) => {
            if (avatar.avatarName === data[attr].tokenDisplayName) {
              avatar.labels.push(keyObj.displayName);
            }
          });
        } else {
          allAvatars.push({
            labels: [keyObj.displayName],
            avatarName: data[attr].tokenDisplayName,
            avatarId: data[attr].id,
          });
        }
        avatarNames.push(data[attr].tokenDisplayName);
      }
    });
  }

  return (
    data && (
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="baseline" justify="center">
            <Grid item>
              <Typography variant="body2" className={classes.typoGraphAttr}>
                {getResourceValueByKey(resource, "GRAPH_ATTR", "Graph Attr.")} -
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.typotitle}>
                &nbsp;{uiMeta.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            className={classes.attrsContainer}
          >
            {!isEmpty(avatarKeys) && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container justify="flex-start">
                  {allAvatars.map((avatar, index) => {
                    return (
                      <Grid item key={index} xs={12} sm={4} md={4} lg={4}>
                        <Avatar avatar={avatar} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            )}
            {keysToRender ? (
              keysExceptAvatarKeys.map((keyObj) => {
                attr = keyObj.name;
                if (data.hasOwnProperty(attr)) {
                  return (
                    <Grid item xs={12} sm={4} md={4} lg={4} key={attr}>
                      <RenderAttributes
                        data={data}
                        keyObj={keyObj}
                        tokenData={tokenData}
                      />
                    </Grid>
                  );
                }
              })
            ) : (
              <Grid item>
                <RecursiveRenderAttributes
                  data={data.result ? data.result : data}
                />
              </Grid> // when there is no whiteList attributes from uiMeta
            )}
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default WhiteListedData;
