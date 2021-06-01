import React, { useState } from "react";
import upload from "../../images/upload.png";
import { Progress } from "reactstrap";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Button, makeStyles, Box } from "@material-ui/core";

const acceptedFiles =
  "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*";

const useStyles = makeStyles((theme) => ({
  uploadBox: {
    width: "100%",
    margin: 0,
    padding: 6,
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "space-evenly",
  },
  inputFile: {
    fontSize: 12,
    padding: 10,
    margin: 10,
    background: "#d0e1ff",
    border: "none",
    borderRadius: "3px",
    "::placeholder": {
      color: "#d0e1ff",
    },
  },
  uploadButton: {
    width: "30%",
  },
}));

const UploadDocument = (props) => {
  const {
    resource,
    onFileUpload,
    docRef,
    onSuccessTrigger,
    onErrorTrigger,
  } = props;
  const classes = useStyles();
  const [documentState, setDocumentState] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const onFileSelect = (event) => {
    setDocumentState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };


  return (
    <Box className={classes.uploadBox}>
      <img src={upload} alt="chatbot-header-tile" height="35px" width="35px" />
      <input
        className={classes.inputFile}
        type="file"
        accept={acceptedFiles}
        placeholder={getResourceValueByKey(
          resource,
          "SELECT_FILE",
          "Select File"
        )}
        onChange={(e) => onFileSelect(e)}
      />
      {disableButton ? (
        <div className="form-group" style={{ color: "green", fontSize: 12 }}>
          <Progress
            max="100"
            color="success"
            value={documentState ? documentState.loaded : null}
          >
            {Math.round(documentState ? documentState.loaded : null, 2)}%
          </Progress>
        </div>
      ) : (
        <Button
          disabled={!documentState}
          variant="outlined"
          color="primary"
          className={classes.uploadButton}
          onClick={() => {
            onFileUpload(
              documentState.selectedFile,
              props.triggerNextStep,
              setDocumentState,
              setDisableButton,
              docRef,
              onSuccessTrigger,
              onErrorTrigger
            );
          }}
        >
          {getResourceValueByKey(resource, "UPLOAD", "Upload")}
        </Button>
      )}
    </Box>
  );
};

export default UploadDocument;
