import React from "react";
import HighlightedLabelValue from "../common/molecules/HighlightedLabelValue";
import EditableLabelValue from "../common/molecules/EditableLabelValue";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  keyListRoot: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  button: {
    minWidth: 32,
  },
  icon: {
    fontSize: "24px",
  },
  editContainer: {
    position: "absolute",
    top: 25,
    right: 20,
  },
  firstAttr: {
    width: "100%",
  },
}));

const OcrKeyList = (props) => {
  const { resource, refOcrKeyList, highlightedKeyList, editKeyList } = props;

  const classes = useStyles();

  const editAndRenderAttr = (edit, updateAttrRef, label, value, fullWidth) => {
    return edit ? (
      <EditableLabelValue
        resource={resource}
        width={fullWidth ? "100%" : "340px"}
        updateAttrRef={updateAttrRef}
        label={label}
        values={value}
      />
    ) : (
      <HighlightedLabelValue
        resource={resource}
        // width={fullWidth ? "100%" : "340px"}
        label={label}
        value={value}
      />
    );
  };

  const RenderSubListItem = (props) => {
    const { item, editKeyList, refOcrKeyList, index1, index2 } = props;

    let updateAttrRef = refOcrKeyList[index1].subList[index2];

    return editAndRenderAttr(
      editKeyList,
      updateAttrRef,
      item.keyword,
      item.values
    );
  };

  const RenderKeyListItem = (props) => {
    const { item, editKeyList, refOcrKeyList, index1, fullWidth } = props;

    let updateAttrRef = refOcrKeyList[index1];

    if (item.subList) {
      return (
        <Box className={classes.firstAttr}>
          {editAndRenderAttr(
            editKeyList,
            updateAttrRef,
            item.keyword,
            item.values,
            fullWidth
          )}
          <Grid container justify="flex-start">
            {item.subList.map((subListItem, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <RenderSubListItem
                    item={subListItem}
                    editKeyList={editKeyList}
                    refOcrKeyList={refOcrKeyList}
                    index1={index1}
                    index2={index}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    } else {
      return editAndRenderAttr(
        editKeyList,
        updateAttrRef,
        item.keyword,
        item.values,
        fullWidth
      );
    }
  };

  return (
    <Box className={classes.keyListRoot}>
      {highlightedKeyList.length === 0 ? (
        <Typography variant="body2" color={"error"}>
          {getResourceValueByKey(resource, "NO_KEY_LIST", "No Keylist!")}
        </Typography>
      ) : (
        highlightedKeyList.map((item, index) => {
          return (
            <RenderKeyListItem
              key={index}
              item={item}
              editKeyList={editKeyList}
              refOcrKeyList={refOcrKeyList}
              index1={index}
              fullWidth={true}
            />
          );
        })
      )}
    </Box>
  );
};

export default OcrKeyList;
