import React from "react";
import { post } from "../../utils/callApi";
import { getActivitiesAndEventsBody } from "../../utils/getPayloads/tokenPayloads";
import { env } from "../../ENV";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TriggerEventsContainer from "./TriggerEventsContainer";
import TokenEvents from "../../components/tradebotApp/TokenEvents";

const useStyles = makeStyles((theme) => ({
  eventsRootBox: {
    position: "relative",
    height: "100%",
  },
  triggerEventsBox: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex:4
  },
}));

const TokenEventsContainer = (props) => {
  const { resource, token, tokenType, lastSelectedNode } = props;
  const classes = useStyles();

  const getEvents = (query) => {
    let id;
    if (lastSelectedNode?.token || lastSelectedNode?.subtoken) {
      id = lastSelectedNode?.id;
    } else {
      id = token[tokenType].id;
    }
    let body = getActivitiesAndEventsBody(id, tokenType);
    return new Promise((resolve, reject) => {
      post(env.TOKEN_EVENTS_SEARCH_URL, body).then((result) => {
        if (result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
          });
        }
      });
    });
  };

  return (
    <Box className={classes.eventsRootBox}>
      <Box className={classes.triggerEventsBox}>
        <TriggerEventsContainer
          resource={resource}
          tokenType={tokenType}
          lastSelectedNode={lastSelectedNode}
        />
      </Box>
      <TokenEvents resource={resource} getEvents={getEvents} />
    </Box>
  );
};

export default TokenEventsContainer;
