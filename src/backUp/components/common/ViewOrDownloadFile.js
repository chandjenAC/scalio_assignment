import React, { useState, useEffect } from "react";
import AvatarLogoBorder from "../../images/AvatarLogoBorder";
import { env } from "../../ENV";
import PDFviewer from "./PDFviewer";
import { Typography, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles } from "@material-ui/core/styles";
import { viewOrDownloadFile } from "../../utils/viewOrDownloadFile";

const useStyles = makeStyles((theme) => ({
  fileViewContainer: {
    width: "100%",
    height: "100%",
  },
  fileViewerTitle: {
    width: "100%",
    height: "auto",
  },
  fileViewer: {
    width: "100%",
    flexGrow: "1",
  },
  typoContainer: {
    height: "100%",
  },
}));

const downloadFormats = [
  "FILE/XLS",
  "FILE/XLSX",
  "XLSX",
  "XLS",
  "FILE/CSV",
  "CSV",
];

const ViewOrDownloadFile = (props) => {
  const { resource, file, cachedDocs } = props;
  const { fileId, fileType, fileFormat, fileName } = file;
  const classes = useStyles();
  const [pdf, setPdf] = useState(null);
  const yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));

  const sessionId = yogiUserInfo.sessionId;
  // const usertoken = yogiUserInfo?.usertoken;

  useEffect(() => {
    let pdfDoc = cachedDocs[fileId];
    if (pdfDoc) {
      setPdf(pdfDoc);
    }
  }, [cachedDocs]);

  return (
    <Grid
      container
      className={classes.fileViewContainer}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item className={classes.fileViewerTitle}>
        <Typography variant="body1">
          {fileType === "doc"
            ? getResourceValueByKey(
                resource,
                "DOCUMENT_VIEWER",
                "Documente Viewer"
              )
            : getResourceValueByKey(resource, "IMAGE_VIEWER", "Image Viewer")}
        </Typography>
      </Grid>
      <Grid item className={classes.fileViewer}>
        {fileType === "doc" ? (
          downloadFormats.includes(fileFormat.toUpperCase()) ? (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.typoContainer}
            >
              {viewOrDownloadFile({
                id: fileId,
                name: fileName,
                format: fileFormat,
                viewOrDownloadKey: "download",
              })}
              <Grid item>
                <Typography variant="body2">
                  {getResourceValueByKey(
                    resource,
                    "FILE_DOWNLOAD_WILL_START_AUTOMATICALLY",
                    "File download will start automatically!"
                  )}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <PDFviewer pdfDoc={pdf} />
          )
        ) : (
          <AvatarLogoBorder
            width="130"
            height="131"
            url={`${env.DOC_MGMT_SRVC_DOC_RETRIEVE_URL}logo/${fileId}/${sessionId}`}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default ViewOrDownloadFile;
