import React, { useState, useEffect } from "react";
import Input from "../atoms/Input/Input";
import { makeStyles, Tooltip } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../../utils/resourceHelper";
import cloneDeep from "lodash/cloneDeep";

const useStyles = makeStyles((theme) => ({
  editableLabelValueRoot: {
    padding: 4,
  },
}));

const EditableLabelValue = (props) => {
  const {
    resource,
    updateAttrRef,
    updateAttrIndices,
    ocrTableCtxt,
    disableEdit,
    label: labelProp,
    values: valuesProp,
    inputWidth,
    index,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    setValues(valuesProp);
    setLabel(labelProp);
  }, [valuesProp, labelProp]);

  const [values, setValues] = useState(valuesProp);
  const [label, setLabel] = useState(labelProp);

  const updateStateAndRef = (attr, value) => {
    let newState;
    if (attr.attrValue.hasOwnProperty("addedAttr")) {
      newState = {
        addedAttr: true,
        oldvalue: attr.attrValue.oldvalue,
        newvalue: value,
      };
    } else if (attr.attrValue.hasOwnProperty("oldvalue")) {
      newState = {
        oldvalue: attr.attrValue.oldvalue,
        newvalue: value,
      };
    } else {
      newState = value;
    }
    if (attr.label) {
      setLabel(newState);
      updateAttrRef.keyword = value; //this case exists only for OCRkeyList
    } else if (attr.value) {
      setValues(newState);
      //if ocr table content=> only values, no labels here..updateAttrRef is neither an object or array..so looping through the indices and getting the data ref by fieldname..
      if (ocrTableCtxt) {
        let ref = updateAttrRef;
        let indices = cloneDeep(updateAttrIndices);
        let fieldName = indices.splice(indices.length - 1, 1);
        for (let i = 0; i < indices.length; i++) {
          ref = ref[indices[i]];
        }
        ref[fieldName] = value;
      } else {
        updateAttrRef.values = value; //this case exists only for OCRkeyList
      }
    }
  };

  const handleChangeAttr = (e, attr, attrParentArray, attrIndex) => {
    if (attrParentArray) {
      //this condition exists only for values[ie; values can be array]
      let tempAttrs = cloneDeep(attrParentArray);
      if (attrParentArray[attrIndex].hasOwnProperty("addedAttr")) {
        tempAttrs[attrIndex] = {
          addedAttr: true,
          oldvalue: attrParentArray[attrIndex].oldvalue,
          newvalue: e.target.value,
        };
      } else if (attrParentArray[attrIndex].hasOwnProperty("oldvalue")) {
        tempAttrs[attrIndex] = {
          oldvalue: attrParentArray[attrIndex].oldvalue,
          newvalue: e.target.value,
        };
      } else {
        tempAttrs[attrIndex] = e.target.value;
      }
      updateAttrRef.values[attrIndex] = e.target.value; // updating value data ref coz only values are array not labels
      setValues(tempAttrs); // updating value data ref coz only values are array not labels
    } else {
      !disableEdit && updateStateAndRef(attr, e.target.value);
    }
  };

  const editAttr = (attr, attrParentArray, attrIndex) => {
    let value = attr.attrValue;

    return value &&
      typeof value === "object" &&
      value.hasOwnProperty("oldvalue") ? (
      <Tooltip
        key={attrIndex}
        title={
          value.addedAttr
            ? getResourceValueByKey(
                resource,
                "ADDED_ATTRIBUTE",
                "Added attribute"
              )
            : value.newvalue === ""
            ? getResourceValueByKey(
                resource,
                "DELETED_ATTRIBUTE",
                "Deleted attribute"
              )
            : value.oldvalue === ""
            ? getResourceValueByKey(
                resource,
                "NO_PREVIOUS_VALUE",
                "No previous value"
              )
            : value.oldvalue
        }
        maxWidth={600}
        placement="left"
      >
        <Input
          margin="2px 0px"
          padding="2px 0px"
          background={
            value.addedAttr
              ? "#a1ffa2"
              : value.newvalue === ""
              ? "#ffabb9"
              : "#d0e1ff"
          }
          width={inputWidth}
          border="1px solid #d0e1ff"
          fontSize={attr.label ? "13px" : "14px"}
          fontWeight={attr.label ? "700" : "400"}
          fontFamily={"Lato"}
          borderRadius="3px"
          placeholder={value.oldvalue}
          value={value.newvalue === "" ? value.oldvalue : value.newvalue}
          onChange={(e) =>
            handleChangeAttr(e, attr, attrParentArray, attrIndex)
          }
        />
      </Tooltip>
    ) : (
      <Input
        key={attrIndex}
        margin="2px 0px"
        padding="2px 0px"
        width={inputWidth}
        border="1px solid #d0e1ff"
        background="#f8f8f8"
        fontWeight={attr.label ? "700" : "400"}
        fontSize={attr.label ? "13px" : "14px"}
        fontFamily={"Lato"}
        borderRadius="3px"
        value={value}
        onChange={(e) => handleChangeAttr(e, attr, attrParentArray, attrIndex)}
      />
    );
  };

  const editValueArray = (values) => {
    return values.map((value, index) => {
      return editAttr({ attrValue: value, value: true }, values, index);
    });
  };

  return (
    <Grid
      container
      className={classes.editableLabelValueRoot}
      direction="column"
      alignItems="flex-start"
      index={index}
    >
      <Grid item>
        {(label || label === "") && editAttr({ attrValue: label, label: true })}
      </Grid>
      <Grid item>
        {Array.isArray(values)
          ? editValueArray(values)
          : editAttr({ attrValue: values, value: true })}
      </Grid>
    </Grid>
  );
};

export default EditableLabelValue;
