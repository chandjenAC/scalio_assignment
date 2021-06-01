import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import SettingsGrid from "../../components/tradebotApp/NetworkTreeInfo/SettingsGrid";
import { env } from "../../ENV";
import { post, del } from "../../utils/callApi";

const UserSettingsContainer = (props) => {
  const { resource, lastSelectedNode } = props;

  const getUserSettings = (query) => {
    let body = {
      entityId: lastSelectedNode?.id,
    };
    return new Promise((resolve, reject) => {
      post(env.NEON_SERVICE_SEARCH_USER_SETTINGS, body).then((result) => {
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
    await post(env.NEON_SERVICE_SAVE_USER_SETTINGS, newData);
  };

  const updateSettings = async (newData) => {
    await post(env.NEON_SERVICE_SAVE_USER_SETTINGS, newData);
  };

  const deleteSettings = async (oldData) => {
    await del(env.NEON_SERVICE_SAVE_USER_SETTINGS, oldData);
  };
  return (
    <SettingsGrid
      resource={resource}
      title={getResourceValueByKey(resource, "USER_SETTINGS", "User Settings")}
      lastSelectedNode={lastSelectedNode}
      getSettings={getUserSettings}
      addSettings={addSettings}
      updateSettings={updateSettings}
      deleteSettings={deleteSettings}
    />
  );
};

export default UserSettingsContainer;
