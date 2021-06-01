import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import resource from "../../../resources/common.json";
import DialogBox from "../molecules/DialogBox/DialogBox";
import LabelAndValue from "../LabelAndValue";
import Mtable from "./Mtable";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
    maxWidth: "40px",
  },
  mainGrid: {
    marginTop: 8,
    minWidth: 300,
  },
}));

const PathAndValue = (props) => {
  const { ipAddress, requestData, responseData, setViewReqRes } = props;

  const columns = [
    {
      field: "path",
      title: getResourceValueByKey(resource, "FIELD_NAME", "Field Name"),
      dontTruncate: true,
    },
    {
      field: "value",
      title: getResourceValueByKey(resource, "VALUE", "Value"),
      dontTruncate: true,
    },
  ];

  const classes = useStyles();

  const handleClose = (e) => {
    e.stopPropagation();
    setViewReqRes(false);
  };

  const renderGrid = (title, columns, data, errorText) => {
    return data && data.length > 0 && data[0].path ? (
      <Mtable
        style={{ minWidth: 450, padding: "16px" }}
        title={title}
        columns={columns}
        data={data}
        options={{
          sorting: false,
          filtering: false,
          draggable: false,
          pageSize: 5,
          maxBodyHeight: 700,
        }}
      />
    ) : (
      <Grid
        container
        style={{ height: "100%" }}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Typography variant="body2" color="error">
            {errorText}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderRequestGrid = () => {
    const title = getResourceValueByKey(resource, "REQUEST", "Request");
    const errorText = getResourceValueByKey(
      resource,
      "NO_REQUEST_INFO",
      "No request info!"
    );
    return renderGrid(title, columns, requestData, errorText);
  };

  const renderResponseGrid = () => {
    const title = getResourceValueByKey(resource, "RESPONSE", "Response");
    const errorText = getResourceValueByKey(
      resource,
      "NO_RESPONSE_INFO",
      "No response info!"
    );
    return renderGrid(title, columns, responseData, errorText);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  return (
    <>
      <DialogBox
        open={true}
        handleClose={handleClose}
        dialogActions={dialogActions}
        title={getResourceValueByKey(
          resource,
          "REQUEST_AND_RESPONSE",
          "Request & Response"
        )}
      >
        <LabelAndValue
          label={getResourceValueByKey(resource, "IP_ADDRESS", "IP Address")}
          value={ipAddress}
        />
        <Grid container className={classes.mainGrid} spacing={2}>
          <Grid item>{renderRequestGrid()}</Grid>
          <Grid item>{renderResponseGrid()}</Grid>
        </Grid>
      </DialogBox>
    </>
  );
};

export default PathAndValue;
