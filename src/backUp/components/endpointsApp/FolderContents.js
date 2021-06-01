import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { useNavigate } from "react-router";
import Mtable from "../common/organisms/Mtable";

const FolderContents = (props) => {
  const {
    resource,
    folderName,
    isOutgoing,
    columns,
    getFolderContents,
    handleViewOnGraph,
    handleViewUploadDocDialogBox,
  } = props;
  const navigate = useNavigate();

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={columns}
      data={getFolderContents}
      actions={[
        {
          icon: tableIcons.Upload,
          tooltip: getResourceValueByKey(
            resource,
            "UPLOAD_DOCUMENTS",
            "Upload Documents"
          ),
          isFreeAction: true,
          hidden: isOutgoing === "true" ? true : false,
          onClick: handleViewUploadDocDialogBox,
        },
        {
          icon: tableIcons.View,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_ON_GRAPH",
            "View on graph"
          ),
          onClick: (event, rowData) => handleViewOnGraph(rowData),
        },
        (rowData) =>
          rowData.processInstanceId && {
            icon: tableIcons.Logs,
            tooltip: getResourceValueByKey(resource, "VIEW_LOGS", "View logs"),
            onClick: () => {
              let docName = rowData.name;
              let processInstanceId = rowData.processInstanceId;
              navigate(
                `${docName}/logs/${processInstanceId}?folderName=${folderName}&isOutgoing=${isOutgoing}`,
                {
                  state: {
                    goBack: true,
                  },
                }
              );
            },
          },
      ]}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 15,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
};

export default FolderContents;
