import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { useNavigate } from "react-router-dom";
import Mtable from "../common/organisms/Mtable";

const EndpointRegistryTable = (props) => {
  const {
    resource,
    registryColumns,
    getFolderRegistry,
    updateEndpointsRow,
    addEndpointsRow,
    deleteEndpointsRow,
  } = props;
  const navigate = useNavigate();

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      data={getFolderRegistry}
      columns={registryColumns}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addEndpointsRow(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateEndpointsRow(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteEndpointsRow(oldData);
              resolve();
            }, 1000);
          }),
      }}
      actions={[
        {
          icon: tableIcons.Folder,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_FOLDER_CONTENTS",
            "View folder contents"
          ),
          onClick: (event, rowData) => {
            let endPoint = encodeURIComponent(rowData.endPoint);
            navigate(
              `${endPoint}/${rowData.avatarId}?folderName=${rowData.name}&isOutgoing=${rowData.isOutgoing}`,
              {
                state: {
                  goBack: true,
                },
              }
            );
          },
        },
        {
          icon: tableIcons.Definitions,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_DOC_DEFINITIONS",
            "View document definitions"
          ),
          onClick: (event, rowData) => {
            let endPoint = encodeURIComponent(rowData.endPoint);
            let folderId = rowData.id;
            navigate(`${endPoint}/dayt/${folderId}`, {
              state: { goBack: true },
            });
          },
        },
      ]}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 10,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
};

export default EndpointRegistryTable;
