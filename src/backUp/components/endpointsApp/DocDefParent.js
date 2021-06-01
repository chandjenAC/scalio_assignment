import React from "react";
import SegmentAndFieldTables from "./SegmentAndFieldTables";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DocDefTitle from "./DocDefTitle";
import Loader from "../common/atoms/Loaders/Loader";

const useStyles = makeStyles((theme) => ({
  mainCont: {
    position: "relative",
    flexWrap: "noWrap",
    height: "100%",
  },
  appHeader: {
    width: "100%",
    flex: "0 1 auto",
  },
  tablesCont: {
    maxWidth: "100%",
    // maxHeight: "85vh",
    flexWrap: "nowrap",
    flex: "1 1 auto",
    overflow: "scroll",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  noDefinitions: {
    display: "grid",
    placeItems: "center",
    height: "100%",
  },
}));

const DocDefParent = (props) => {
  const {
    resource,
    loading,
    docDef,
    docDefRef,
    handleRemoteSegmentsData,
    handleRemoteFieldsData,
    updateDocDef,
    updateDocSegsRow,
    addDocFieldsRow,
    updateDocFieldsRow,
    deleteDocFieldsRow,
    handleViewGraphClick,
    handleViewEntityDefsClick,
  } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.mainCont}>
      <Grid item className={classes.tablesCont}>
        {loading ? (
          <div className={classes.centerDiv}>
            <Loader />
          </div>
        ) : docDef.length > 0 ? (
          <>
            <DocDefTitle
              resource={resource}
              docDefRef={docDefRef}
              updateDocDef={updateDocDef}
              handleViewGraphClick={handleViewGraphClick}
              handleViewEntityDefsClick={handleViewEntityDefsClick}
            />
            <SegmentAndFieldTables
              resource={resource}
              handleRemoteSegmentsData={handleRemoteSegmentsData}
              handleRemoteFieldsData={handleRemoteFieldsData}
              updateDocSegsRow={updateDocSegsRow}
              addDocFieldsRow={addDocFieldsRow}
              updateDocFieldsRow={updateDocFieldsRow}
              deleteDocFieldsRow={deleteDocFieldsRow}
            />
          </>
        ) : (
          <div className={classes.noDefinitions}>
            <Typography variant="body2" color="error">
              {getResourceValueByKey(
                resource,
                "NO_DOCUMENT_DEFINITIONS!",
                "No document definitions!"
              )}
            </Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default DocDefParent;
