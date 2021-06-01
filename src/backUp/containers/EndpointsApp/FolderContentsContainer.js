import React, { useContext, useEffect, useState } from "react";
import FolderContents from "../../components/endpointsApp/FolderContents";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Box, Fade, Paper } from "@material-ui/core";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import DialogBox from "../../components/common/molecules/DialogBox/DialogBox";
import FileUploadContainer from "../Common/FileUploadContainer";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const FolderContentsContainer = (props) => {
  const { resource } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const endPoint = params.endPoint;
  const avatarId = params.avatarId;
  const queryString = new URLSearchParams(location.search);
  const folderName = queryString.get("folderName");
  const isOutgoing = queryString.get("isOutgoing");

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [viewUploadDocDialogBox, setViewUploadDocDialogBox] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
        path: "/yogi-webb/end-points",
      },
      {
        title: getResourceValueByKey(
          resource,
          "FOLDER_CONTENTS",
          "Folder Contents"
        ),
        path: "",
      },
    ]);
  }, []);

  const columns = [
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },
    {
      field: "size",
      title: getResourceValueByKey(resource, "SIZE(BYTES)", "Size (bytes)"),
      render: (rowData) => {
        return rowData.size.toLocaleString();
      },
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
    },
    {
      field: "lastModified",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      dontTruncate: true,
      type: "datetime",
    },
  ];

  const getFolderContents = (query) => {
    return new Promise((resolve, reject) => {
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = { folderPath: endPoint, paging: paging };
      post(env.LIST_FOLDER_CONTENTS, body).then((result) => {
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

  const handleViewOnGraph = (rowData) => {
    navigate(
      `${rowData.id}?folderName=${folderName}&isOutgoing=${isOutgoing}`,
      {
        state: { goBack: true, dayt: { type: "DocToken", name: rowData.name } },
      }
    );
  };

  const handleViewUploadDocDialogBox = () => {
    setViewUploadDocDialogBox(true);
  };

  const handleCloseUploadDocDialogBox = () => {
    setViewUploadDocDialogBox(false);
  };

  const getHeader = () => {
    return <AppHeader title={folderName} />;
  };

  const getMainSection = () => {
    return (
      <>
        <FolderContents
          resource={resource}
          folderName={folderName}
          isOutgoing={isOutgoing}
          columns={columns}
          getFolderContents={getFolderContents}
          handleViewOnGraph={handleViewOnGraph}
          handleViewUploadDocDialogBox={handleViewUploadDocDialogBox}
        />
        <DialogBox
          open={viewUploadDocDialogBox}
          handleClose={handleCloseUploadDocDialogBox}
          title={getResourceValueByKey(
            resource,
            "UPLOAD_DOCUMENT",
            "Upload Document"
          )}
        >
          <FileUploadContainer
            docMeta={{
              avatarId: avatarId,
              linkedTxnType: "Asset",
              category: "Asset",
              storageLocation: endPoint,
            }}
            acceptedFiles="application/pdf,.csv"
          />
        </DialogBox>
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default FolderContentsContainer;
