import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../common/atoms/Loaders/Loader";
import DocBatchGrid from "./DocBatchGrid";

const useStyles = makeStyles((theme) => ({
  docEntitiesRoot: {
    // height: "100%",
  },
  title: {
    height: "auto",
    width: "100%",
    textAlign: "center",
  },
  detailsPanel: {
    width: "100%",
    paddingTop: 4,
    flexGrow: "1",
    maxHeight: 640,
    overflow: "scroll",
  },
  typotitle: {
    color: theme.palette.primary.main,
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const DocEntities = (props) => {
  const {
    resource,
    docEntities,
    getDetailsGrid,
    headerColumns,
    detailsColumns,
    footerColumns,
  } = props;

  const classes = useStyles();

  return docEntities ? (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.docEntitiesRoot}
    >
      <Grid item className={classes.title}>
        <Grid container alignItems="baseline" justify="center">
          <Grid item>
            <Typography variant="body1" className={classes.typotitle}>
              {getResourceValueByKey(resource, "ENTITIES", "Entities")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.detailsPanel}>
        {headerColumns.length > 0 && (
          <DocBatchGrid
            title={getResourceValueByKey(resource, "HEADER", "Header")}
            columns={headerColumns}
            data={[docEntities.header]}
          />
        )}

        {detailsColumns.length > 0 && (
          <DocBatchGrid
            title={getResourceValueByKey(resource, "DETAILS", "Details")}
            columns={detailsColumns}
            data={getDetailsGrid}
          />
        )}

        {footerColumns.length > 0 && (
          <DocBatchGrid
            title={getResourceValueByKey(resource, "FOOTER", "Footer")}
            columns={footerColumns}
            data={[docEntities.footer]}
          />
        )}
      </Grid>
    </Grid>
  ) : (
    <div className={classes.centerDiv}>
      <Loader />
    </div>
  );
};

export default DocEntities;
