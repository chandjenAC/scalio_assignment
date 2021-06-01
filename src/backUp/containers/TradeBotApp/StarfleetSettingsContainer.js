import React from "react";
import SettingsGrid from "../../components/tradebotApp/NetworkTreeInfo/SettingsGrid";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { post, del } from "../../utils/callApi";

const StarfleetSettingsContainer = (props) => {
  const { resource, lastSelectedNode } = props;

  const getStarfleetSettings = (query) => {
    let body = {
      entityId: lastSelectedNode?.displayName,
    };
    return new Promise((resolve, reject) => {
      post(env.NEON_SERVICE_SEARCH_STARFLEET_SETTINGS, body).then((result) => {
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

  const addSettings = async (newData) => {
    newData.entityId = lastSelectedNode.displayName;
    await post(env.NEON_SERVICE_SAVE_STARFLEET_SETTINGS, newData);
  };

  const updateSettings = async (newData) => {
    await post(env.NEON_SERVICE_SAVE_STARFLEET_SETTINGS, newData);
  };

  const deleteSettings = async (oldData) => {
    await del(env.NEON_SERVICE_SAVE_STARFLEET_SETTINGS, oldData);
  };

  return (
    lastSelectedNode.flags?.starfleet && (
      <SettingsGrid
        resource={resource}
        title={getResourceValueByKey(
          resource,
          "STARFLEET_SETTINGS",
          "Starfleet Settings"
        )}
        lastSelectedNode={lastSelectedNode}
        getSettings={getStarfleetSettings}
        addSettings={addSettings}
        updateSettings={updateSettings}
        deleteSettings={deleteSettings}
      />
    )
  );
};

export default StarfleetSettingsContainer;
