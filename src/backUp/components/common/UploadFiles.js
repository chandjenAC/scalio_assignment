import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import uploadIcon from "../../images/upload.png";
import { getResourceValues } from "../../utils/resourceHelper";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import LinearProgressWithLabel from "./molecules/Charts/LinearProgressWithLabel";

const colors = ["#1ff26a", "#1a90ff"];

const useStyles = makeStyles((theme) => ({
  uploadBox: {
    width: "100%",
    margin: 0,
    padding: 6,
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "space-evenly",
  },
  input: {
    display: "block",
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
  progressBarItem: {
    textAlign: "left",
    width: "95%",
  },
  uploadButtonText: {
    fontWeight: 400,
  },
  canvas: {
    width: 100,
    height: 100,
    border: "1px solid lightgrey",
    borderRadius: 5,
  },
  image: { border: "1px solid lightgrey", padding: 3, borderRadius: 5 },
}));

const UploadFiles = ({
  resource,
  acceptedFiles,
  selectedFiles,
  progressInfos,
  selectFiles,
  uploadFiles,
  buttonDisable,
}) => {
  const classes = useStyles();

  const phrase1 = getResourceValueByKey(
    resource,
    "+{noOfItems}_MORE",
    "+{noOfItems} more"
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={1}
    >
      <Grid item>
        <img src={uploadIcon} alt="uploadIcon" height="35px" width="35px" />
      </Grid>

      {progressInfos &&
        progressInfos.map((progressInfo, index) => (
          <Grid item className={classes.progressBarItem}>
            <Typography variant="caption">{progressInfo.fileName}</Typography>
            <LinearProgressWithLabel
              value={progressInfo.percentage}
              color={index % 2 === 0 ? colors[0] : colors[1]}
            />
          </Grid>
        ))}

      <Grid item>
        <input
          className={classes.input}
          type="file"
          multiple
          accept={acceptedFiles}
          onChange={selectFiles}
        />
      </Grid>

      <Grid item>
        <Grid container alignItems="center" justify="center" spacing={1}>
          {selectedFiles &&
            selectedFiles.length > 0 &&
            Array.from(selectedFiles).map((file, index) => {
              return index < 3 ? (
                <Grid item>
                  {file.type === "application/pdf" ? (
                    <canvas id={`canvas${index}`} className={classes.canvas} />
                  ) : ["image/svg+xml", "image/png", "image/jpeg"].includes(
                      file.type
                    ) ? (
                    <img
                      id={`image${index}`}
                      alt={file.name}
                      className={classes.image}
                      height={100}
                    />
                  ) : null}
                </Grid>
              ) : null;
            })}
          {selectedFiles && selectedFiles.length > 3 && (
            <Grid item>
              <Typography variant="body2">
                {getResourceValues(phrase1, {
                  noOfItems: selectedFiles.length - 3,
                })}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disabled={buttonDisable}
          onClick={uploadFiles}
          classes={{ label: classes.uploadButtonText }}
        >
          {getResourceValueByKey(resource, "UPLOAD", "Upload")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadFiles;
