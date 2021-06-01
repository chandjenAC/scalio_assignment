import React from "react";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import Mtable from "../../common/organisms/Mtable";

const SettingsGrid = (props) => {
  const {
    resource,
    title,
    getSettings,
    addSettings,
    updateSettings,
    deleteSettings,
  } = props;

  const columns = [
    {
      field: "settingName",
      title: getResourceValueByKey(resource, "SETTING_NAME", "Setting Name"),
      dontTruncate: true,
    },
    {
      field: "settingValue",
      title: getResourceValueByKey(resource, "SETTING_VALUE", "Setting Value"),
      dontTruncate: true,
    },
    {
      field: "settingType",
      title: getResourceValueByKey(resource, "SETTING_TYPE", "Setting Type"),
      dontTruncate: true,
    },
    {
      field: "settingCategory",
      title: getResourceValueByKey(
        resource,
        "SETTING_CATEGORY",
        "Setting Category"
      ),
      dontTruncate: true,
    },
    {
      field: "updatedBy",
      title: getResourceValueByKey(resource, "UPDATED_BY", "Updated By"),
      dontTruncate: true,
    },
    {
      field: "updatedOn",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      type: "datetime",
    },
  ];

  return (
    <Mtable
      style={{ boxShadow: "none", padding: "0px" }}
      title={title}
      columns={columns}
      data={getSettings}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addSettings(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateSettings(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteSettings(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        paging: false,
        draggable: false,
      }}
    />
  );
};

export default SettingsGrid;
