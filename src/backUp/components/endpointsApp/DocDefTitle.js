import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Grid, Paper, Typography, IconButton } from "@material-ui/core";
import LabelAndValue from "../common/LabelAndValue";
import { makeStyles, Tooltip } from "@material-ui/core";
import ViewIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import EntityDefsIcon from "@material-ui/icons/ListAlt";
import LabelWithEditableValue from "../common/molecules/LabelWithEditableValue";

const useStyles = makeStyles((theme) => ({
  docDefPaperRoot: {
    position: "relative",
    padding: "8px 12px",
    margin: "12px 6px 6px 12px",
  },
  actionsContainer: {
    position: "absolute",
    marginRight: 6,
    width: "fit-content",
    right: "0%",
    top: "50%",
    transform: "translate(0%,-50%)",
  },
  button: {
    padding: 0,
    minWidth: 32,
  },
  icons: {
    fontSize: "1.3rem",
  },
}));

const DocDefTitle = (props) => {
  const {
    resource,
    docDefRef,
    updateDocDef,
    handleViewGraphClick,
    handleViewEntityDefsClick,
  } = props;
  const classes = useStyles();

  const whiteList = [
    {
      key: "name",
      label: getResourceValueByKey(resource, "NAME", "Name"),
      prop: "editable",
    },
    {
      key: "description",
      label: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
      prop: "editable",
    },
    {
      key: "documentType",
      label: getResourceValueByKey(resource, "DOCUMENT_TYPE", "Document Type"),
      prop: "editable",
    },
    {
      key: "format",
      label: getResourceValueByKey(resource, "FORMAT", "Format"),
      prop: "select",
      options: ["XLS", "CSV", "PDF"],
    },
    {
      key: "storageName",
      label: getResourceValueByKey(resource, "STORAGE_NAME", "Storage Name"),
      prop: "editable",
      lowerCase: true,
    },
  ];

  const [edit, setEdit] = useState(false);

  let updateValueRef = { refObj: docDefRef, refIndices: [] };

  const renderValues = () => {
    return (
      <Grid container>
        {whiteList.map((item, index) => {
          return (
            docDefRef[item.key] && (
              <Grid item key={index} xs={12} sm={3} md={2} lg={2}>
                <LabelAndValue label={item.label} value={docDefRef[item.key]} />
              </Grid>
            )
          );
        })}
      </Grid>
    );
  };

  const editValues = () => {
    return (
      <Grid container>
        {whiteList.map((item, index) => {
          return (
            docDefRef[item.key] && (
              <Grid item key={index} xs={12} sm={3} md={2} lg={2}>
                <LabelWithEditableValue
                  label={item.label}
                  value={docDefRef[item.key]}
                  meta={item}
                  updateValueRef={updateValueRef}
                />
              </Grid>
            )
          );
        })}
      </Grid>
    );
  };

  const handleButtonClick = () => {
    if (edit) {
      setEdit(false);
      updateDocDef();
    } else {
      setEdit(true);
    }
  };

  return (
    <Paper elevation={3} className={classes.docDefPaperRoot}>
      <Grid container className={classes.actionsContainer}>
        <Grid item>
          <IconButton
            className={classes.button}
            onClick={() => handleButtonClick()}
          >
            <Tooltip
              title={
                edit ? (
                  <Typography variant="caption">
                    {getResourceValueByKey(resource, "SAVE", "Save")}
                  </Typography>
                ) : (
                  <Typography variant="caption">
                    {getResourceValueByKey(resource, "EDIT", "Edit")}
                  </Typography>
                )
              }
            >
              {edit ? (
                <DoneIcon className={classes.icons} color="primary" />
              ) : (
                <EditIcon className={classes.icons} color="primary" />
              )}
            </Tooltip>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            className={classes.button}
            onClick={() => (edit ? setEdit(false) : handleViewGraphClick())}
          >
            <Tooltip
              title={
                edit ? (
                  <Typography variant="caption">
                    {getResourceValueByKey(resource, "CANCEL", "Cancel")}
                  </Typography>
                ) : (
                  <Typography variant="caption">
                    {getResourceValueByKey(
                      resource,
                      "VIEW_ALL_DOCS_IN_THIS_FORMAT",
                      "View all docs. in this format"
                    )}
                  </Typography>
                )
              }
            >
              {edit ? (
                <CloseIcon className={classes.icons} />
              ) : (
                <ViewIcon className={classes.icons} color="primary" />
              )}
            </Tooltip>
          </IconButton>
        </Grid>
        {!edit && (
          <Grid item>
            <Tooltip
              title={getResourceValueByKey(
                resource,
                "VIEW_ENTITY_DEFINITIONS",
                "View entity definitions"
              )}
            >
              <IconButton
                className={classes.button}
                onClick={() => handleViewEntityDefsClick()}
              >
                <EntityDefsIcon className={classes.icons} color="primary" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>

      {edit ? editValues() : renderValues()}
    </Paper>
  );
};

export default DocDefTitle;
