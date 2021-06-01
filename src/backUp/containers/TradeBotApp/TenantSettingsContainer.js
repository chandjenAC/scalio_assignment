import React from "react";
import SettingsGrid from "../../components/tradebotApp/NetworkTreeInfo/SettingsGrid";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { post, del } from "../../utils/callApi";

const TenantSettingsContainer = (props) => {
  const { resource, lastSelectedNode } = props;

  const getTenantSettings = (query) => {
    let body = {
      entityId: lastSelectedNode?.id,
    };
    return new Promise((resolve, reject) => {
      post(env.NEON_SERVICE_SEARCH_TENANT_SETTINGS, body).then((result) => {
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
    await post(env.NEON_SERVICE_SAVE_TENANT_SETTINGS, newData);
  };

  const updateSettings = async (newData) => {
    await post(env.NEON_SERVICE_SAVE_TENANT_SETTINGS, newData);
  };

  const deleteSettings = async (oldData) => {
    await del(env.NEON_SERVICE_SAVE_TENANT_SETTINGS, oldData);
  };

  return (
    lastSelectedNode.flags?.tenant && (
      <SettingsGrid
        resource={resource}
        title={getResourceValueByKey(
          resource,
          "TENANT_SETTINGS",
          "Tenant Settings"
        )}
        lastSelectedNode={lastSelectedNode}
        getSettings={getTenantSettings}
        addSettings={addSettings}
        updateSettings={updateSettings}
        deleteSettings={deleteSettings}
      />
    )
  );
};

export default TenantSettingsContainer;
