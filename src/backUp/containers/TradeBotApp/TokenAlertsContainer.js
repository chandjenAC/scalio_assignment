import React from "react";
import { post } from "../../utils/callApi";
import { getAlertsAndRemindersBody } from "../../utils/getPayloads/tokenPayloads";
import { env } from "../../ENV";
import TokenAlerts from "../../components/tradebotApp/TokenAlerts";

const TokenAlertsContainer = (props) => {
  const { resource, lastSelectedNode } = props;

  const getAlerts = (query) => {
    let body = getAlertsAndRemindersBody(lastSelectedNode.id);
    return new Promise((resolve, reject) => {
      post(env.TOKEN_REMINDERS_SEARCH_URL, body).then((result) => {
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

  return <TokenAlerts resource={resource} getAlerts={getAlerts} />;
};

export default TokenAlertsContainer;
