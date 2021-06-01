import React, { useState } from "react";
import { isColumnEdited } from "../../utils/smartTable/isColumnEdited";
import { isKeywordDeleted } from "../../utils/smartTable/isKeywordDeleted";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { getSaveTokenDataBody } from "../../utils/getPayloads/tokenPayloads";
import { create_UUID } from "../../utils/index";
import { jsonDifference } from "../../utils/jsonDifference";
import Loader from "../common/atoms/Loaders/Loader";
import { getLineItemsDiff } from "../../utils/smartTable/getLineItemsDiff";
import { getColumnsDiff } from "../../utils/smartTable/getColumnsDiff";
import { createColumnsMeta } from "../../utils/smartTable/createColumnsMeta";
import { setLineItemKeys } from "../../utils/smartTable/modifyLineItemKeys";
import { renameLineItemKeys } from "../../utils/smartTable/modifyLineItemKeys";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import OcrTabPanel from "./OcrTabPanel";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles((theme) => ({
  ocrAttrsRoot: {
    height: "100%",
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
  },
  typoGraphAttr: {
    color: theme.palette.grey[500],
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

const OcrAttributes = (props) => {
  const {
    resource,
    ocrData: ocrDataProp,
    nodeDescriptions,
    setNodeDescriptions,
    selectedOcrTab,
    setSelectedOcrTab,
  } = props;

  const classes = useStyles();

  let refData = ocrDataProp.editedCopy
    ? cloneDeep(ocrDataProp.editedCopy)
    : cloneDeep(ocrDataProp);

  let derivedKeyList = ocrDataProp.highlightedKeyList
    ? cloneDeep(ocrDataProp.highlightedKeyList)
    : cloneDeep(ocrDataProp.keyList);

  let derivedColumns = ocrDataProp.highlightedColumns
    ? cloneDeep(ocrDataProp.highlightedColumns)
    : cloneDeep(ocrDataProp.tableItems && ocrDataProp.tableItems.columns);

  let derivedLineItems = ocrDataProp.highlightedLineItems
    ? cloneDeep(ocrDataProp.highlightedLineItems)
    : cloneDeep(ocrDataProp.tableItems && ocrDataProp.tableItems.lineItems);

  const [ocrData, setOcrData] = useState(ocrDataProp);
  const [highlightedKeyList, setHighlightedKeyList] = useState(derivedKeyList);
  const [highlightedColumns, setHighlightedColumns] = useState(derivedColumns);
  const [highlightedLineItems, setHighlightedLineItems] = useState(
    derivedLineItems
  );
  const [refOcrKeyList, setRefOcrKeyList] = useState(refData.keyList);
  const [refOcrTableItems, setRefOcrTableItems] = useState(refData.tableItems);
  const [loading, setLoading] = useState(false);
  const [editKeyList, setEditKeyList] = useState(false);
  const [editTableItems, setEditTableItems] = useState(false);
  const [scrollTableItems, setScrollTableItems] = useState(false);
  const [addTableColumn, setAddTableColumn] = useState(false);
  const [deleteTableColumn, setDeleteTableColumn] = useState(false);
  const [modifyColumn, setModifyColumn] = useState({
    index: "",
    columnName: "",
  });
  const [addTableRow, setAddTableRow] = useState(false);
  const [deleteTableRow, setDeleteTableRow] = useState(false);
  const [modifyRow, setModifyRow] = useState({
    deleteIndex: "",
    addRows: "",
  });

  const containsKeyList = ocrData.keyList && ocrData.keyList.length > 0;
  const containsTableItems = !isEmpty(ocrData.tableItems);
  let refLineItems = refOcrTableItems && refOcrTableItems.lineItems;
  let refColumns = refOcrTableItems && refOcrTableItems.columns;

  // useEffect(() => {
  //   let keyListDiv = document.getElementById("keyListDiv");
  //   if (scrollKeyList) {
  //     keyListDiv.scrollTo(0, keyListDiv.scrollHeight);
  //     setScrollKeyList(false);
  //   }
  // }, [scrollKeyList]);

  const goBack = () => {
    setAddTableColumn(false);
    setDeleteTableColumn(false);
    setAddTableRow(false);
    setDeleteTableRow(false);
  };

  const addOCRkeyList = () => {
    let updatedKeyList = cloneDeep(highlightedKeyList);
    let newRefOcrKeyList = cloneDeep(refOcrKeyList);
    let newRefAttr = {
      keyword: "",
      values: [""],
      subList: [],
    };
    let newAttr = {
      keyword: {
        addedAttr: true,
        oldvalue: "",
        newvalue: "",
      },
      values: [{ addedAttr: true, oldvalue: "", newvalue: "" }],
      subList: [],
    };
    updatedKeyList.push(newAttr);
    newRefOcrKeyList.push(newRefAttr);
    setRefOcrKeyList(newRefOcrKeyList);
    setHighlightedKeyList(updatedKeyList);
    // setScrollKeyList(true);
  };

  const addColumnFn = () => {
    let index = modifyColumn.index;
    let columnName = modifyColumn.columnName;
    let newRefTableItems = cloneDeep(refOcrTableItems);
    let newColumns = cloneDeep(highlightedColumns);
    let newLineItems = cloneDeep(highlightedLineItems);
    let newRefColumns = newRefTableItems.columns;
    let newRefLineItems = newRefTableItems.lineItems;
    let originalValues;
    let columnsMeta;
    let updatedOcrData;
    let editedCopy;
    if (ocrData.editedCopy) {
      originalValues = cloneDeep(ocrData.originalValues);
      updatedOcrData = cloneDeep(ocrData);
      editedCopy = updatedOcrData.editedCopy;
      if (!editedCopy.changeSummary) {
        //in case of editing columns for the first time[keyList may have undergone edit thereby creating a editedCopy], changeSummary is created on column modification...if changeSummary not created ie; if no columns are added, then changeSummary is created at this stage while submitting data..
        let originalColumns = originalValues.tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editedCopy.changeSummary = meta;
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      } else {
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      }
    } else {
      //in case of editing dimension for the first time, changeSummary is created on column modification.
      originalValues = cloneDeep(ocrData);
      editedCopy = cloneDeep(ocrData);
      if (!editedCopy.changeSummary) {
        //in case of editing columns for the first time, changeSummary is created on column addition...if changeSummary not created ie; if no columns are added, then changeSummary is created at this stage while submitting data..
        let originalColumns = originalValues.tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editedCopy.changeSummary = meta;
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      } else {
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      }
    }
    let columnMetaValue = { originalValue: "", editedValue: columnName };
    columnsMeta.splice(index - 1, 0, columnMetaValue);
    newRefColumns.splice(index - 1, 0, columnName);
    newRefLineItems.map((lineItem) => {
      lineItem[columnName] = "";
    });
    newColumns.splice(index - 1, 0, {
      addedAttr: true,
      oldvalue: "",
      newvalue: columnName,
    });
    newLineItems.map((lineItem) => {
      lineItem[columnName] = {
        addedAttr: true,
        oldvalue: "",
        newvalue: "",
      };
    });

    editedCopy.changeSummary.tableItems.columns = columnsMeta; //modified meta
    if (ocrData.editedCopy) {
      //if updating an edited version
      if (updatedOcrData) {
        updatedOcrData.editedCopy = editedCopy;
      }
      setOcrData(updatedOcrData);
    } else {
      //first edit
      setOcrData(editedCopy);
    }
    setRefOcrTableItems(newRefTableItems);
    setHighlightedColumns(newColumns);
    setHighlightedLineItems(newLineItems);
    goBack();
  };

  const deleteColumnFn = () => {
    let index = modifyColumn.index - 1;
    let newRefTableItems = cloneDeep(refOcrTableItems);
    let newColumns = cloneDeep(highlightedColumns);
    let newLineItems = cloneDeep(highlightedLineItems);
    let newRefColumns = newRefTableItems.columns;
    let newRefLineItems = newRefTableItems.lineItems;
    let originalValues;
    let columnsMeta;
    let updatedOcrData;
    let editedCopy;
    if (ocrData.editedCopy) {
      updatedOcrData = cloneDeep(ocrData);
      originalValues = cloneDeep(ocrData.originalValues);
      editedCopy = updatedOcrData.editedCopy;
      if (!editedCopy.changeSummary) {
        //in case of editing columns for the first time[keyList may have undergone edit thereby creating a editedCopy], changeSummary is created on column modification...if changeSummary not created ie; if no columns are added, then changeSummary is created at this stage while submitting data..
        let originalColumns = originalValues.tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editedCopy.changeSummary = meta;
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      } else {
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      }
    } else {
      //in case of editing dimension for the first time, changeSummary is created on column deletion.
      originalValues = cloneDeep(ocrData);
      editedCopy = cloneDeep(ocrData);
      if (!editedCopy.changeSummary) {
        //in case of editing columns for the first time, changeSummary is created on column modification...if changeSummary not created ie; if no columns are added, then changeSummary is created at this stage while submitting data..
        let originalColumns = originalValues.tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editedCopy.changeSummary = meta;
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      } else {
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      }
    }
    let originalLineItems = originalValues.tableItems.lineItems;
    let columnName =
      columnsMeta[index].editedValue !== ""
        ? columnsMeta[index].editedValue
        : columnsMeta[index].originalValue;

    columnsMeta.map((column, i) => {
      if (i === index) {
        if (column.originalValue === "") {
          //newly added column
          columnsMeta.splice(i, 1);
          newRefColumns.splice(i, 1);
          newRefLineItems.map((lineItem) => {
            delete lineItem[columnName];
          });

          newColumns.splice(i, 1);
          newLineItems.map((lineItem) => {
            delete lineItem[columnName];
          });
        } else {
          //existing column deleted
          let columnMetaValue = {
            originalValue: column.originalValue,
            editedValue: "",
          };
          let newColumnValue = {
            oldvalue: column.originalValue,
            newvalue: "",
          };
          let oldKey = columnName;
          let newKey = column.originalValue;
          const addedAttrCheck = (j, key, newKey, lineItem) => {
            if (key === newKey) {
              lineItem[key] = {
                oldvalue: originalLineItems[j][key],
                newvalue: "",
              };
            }
          };
          columnsMeta[i] = columnMetaValue;
          newRefColumns[i] = "";
          newColumns[i] = newColumnValue;
          newRefLineItems = renameLineItemKeys(newRefLineItems, oldKey, newKey);
          newRefLineItems = setLineItemKeys(newRefLineItems, newKey);
          newLineItems = renameLineItemKeys(newLineItems, oldKey, newKey);
          newLineItems.map((lineItem, j) => {
            Object.keys(lineItem).map((key) => {
              return addedAttrCheck(j, key, newKey, lineItem);
            });
          });
        }
      }
    });

    editedCopy.changeSummary.tableItems.columns = columnsMeta;
    if (ocrData.editedCopy) {
      //if updating an edited version
      if (updatedOcrData) {
        updatedOcrData.editedCopy = editedCopy;
      }
      setOcrData(updatedOcrData);
    } else {
      //first edit
      setOcrData(editedCopy);
    }
    setRefOcrTableItems(newRefTableItems);
    setHighlightedColumns(newColumns);
    setHighlightedLineItems(newLineItems);
    goBack();
    // updateTable(newRefColumns, newRefLineItems);
  };

  const addRowFn = () => {
    let newRefTableItems = cloneDeep(refOcrTableItems);
    let newLineItems = cloneDeep(highlightedLineItems);
    let newRefLineItems = newRefTableItems.lineItems;

    let newLineItem = {};
    Object.keys(newLineItems[0]).map(
      (key) =>
        (newLineItem[key] = {
          addedAttr: true,
          oldvalue: "",
          newvalue: "",
        })
    );
    // for (let i = 0; i < modifyRow.addRows; i++) {
    newLineItems.push(newLineItem);
    // }
    let newRefLineItem = {};
    Object.keys(newRefLineItems[0]).map((key) => (newRefLineItem[key] = ""));
    // for (let i = 0; i < modifyRow.addRows; i++) {
    newRefLineItems.push(newRefLineItem);
    // }

    newRefTableItems.lineItems = newRefLineItems;
    setRefOcrTableItems(newRefTableItems);
    setHighlightedLineItems(newLineItems);
    setScrollTableItems(true);
    goBack();
  };

  const deleteRowFn = () => {
    let index = modifyRow.deleteIndex - 1;
    let newLineItems = cloneDeep(highlightedLineItems);
    let newRefTableItems = cloneDeep(refOcrTableItems);
    let originalValues = cloneDeep(ocrData.originalValues);
    let newRefLineItems = newRefTableItems.lineItems;
    let originalLineItems = originalValues.tableItems.lineItems;

    if (modifyRow.deleteIndex >= originalLineItems.length) {
      //deletes the newly added rows w.r.t the original rows
      newRefLineItems.map((lineItem, i) => {
        if (i === index) {
          newRefLineItems.splice(index, 1);
        }
      });
      newLineItems.map((lineItem, i) => {
        if (i === index) {
          newLineItems.splice(index, 1);
        }
      });
    } else {
      //if the row undergoing deletion is what was was present in originalData, then set newvalue =""...[don't delete the row]
      newRefLineItems.map((lineItem, i) => {
        if (i === index) {
          Object.keys(lineItem).map((key) => (lineItem[key] = ""));
        }
      });
      newLineItems.map((lineItem, i) => {
        if (i === index) {
          Object.keys(lineItem).map(
            (key) =>
              (lineItem[key] = {
                oldvalue: lineItem[key].hasOwnProperty("oldvalue")
                  ? lineItem[key].oldvalue
                  : lineItem[key],
                newvalue: "",
              })
          );
        }
      });
    }
    newRefTableItems.lineItems = newRefLineItems;
    setHighlightedLineItems(newLineItems);
    setRefOcrTableItems(newRefTableItems);
    goBack();
  };

  const handleChangeColumnDetails = (e, flag) => {
    if (flag === "index") {
      setModifyColumn({ ...modifyColumn, index: e.target.value });
    } else {
      setModifyColumn({ ...modifyColumn, columnName: e.target.value });
    }
  };

  const handleChangeRowDetails = (e, flag) => {
    if (flag === "deleteIndex") {
      setModifyRow({ ...modifyRow, deleteIndex: e.target.value });
    } else {
      setModifyRow({ ...modifyRow, addRows: e.target.value });
    }
  };

  const submitData = async (originalValues, editedCopy, flag) => {
    let body = getSaveTokenDataBody(editedCopy);

    setLoading(true);
    await post(env.TOKEN_DATA_URL, body);

    let dimension =
      nodeDescriptions[`${originalValues.type}_${originalValues.id}`];
    let compareDimensionRes = cloneDeep(dimension);
    if (flag.tableItems) {
      setEditTableItems(false);
      let originalLineItems = originalValues.tableItems.lineItems;
      let editedColumns = editedCopy.tableItems.columns;
      let editedLineItems = editedCopy.tableItems.lineItems;

      let updatedColumnsMeta = editedCopy.changeSummary.tableItems.columns;
      let highlightedColumns = getColumnsDiff(
        updatedColumnsMeta,
        editedColumns
      );
      let highlightedLineItems = getLineItemsDiff(
        originalLineItems,
        editedLineItems,
        editedColumns,
        updatedColumnsMeta
      );
      compareDimensionRes.highlightedColumns = highlightedColumns;
      compareDimensionRes.highlightedLineItems = highlightedLineItems;
    } else {
      setEditKeyList(false);

      let originalKeyList = originalValues.keyList;
      let editedKeyList = editedCopy.keyList;
      let highlightedKeyList = jsonDifference(originalKeyList, editedKeyList);
      compareDimensionRes.highlightedKeyList = highlightedKeyList;
    }
    setLoading(false);

    compareDimensionRes.editedCopy = editedCopy;
    compareDimensionRes.originalValues = originalValues;

    let tempObj = cloneDeep(nodeDescriptions);
    tempObj[
      `${originalValues.type}_${originalValues.id}`
    ] = compareDimensionRes;
    setNodeDescriptions(tempObj);
  };

  //this is for the view panel to render current graph level select options
  const onSubmitOcrKeyList = (keyList) => {
    let originalValues;
    let editedCopy;
    if (ocrData.editedCopy) {
      editedCopy = cloneDeep(ocrData.editedCopy);
      originalValues = cloneDeep(ocrData.originalValues); // this is the original copy
      editedCopy.keyList = keyList;
    } else {
      originalValues = cloneDeep(ocrData);
      editedCopy = cloneDeep(ocrData);
      editedCopy.keyList = keyList;
      editedCopy.id = create_UUID();
      editedCopy.originalCopy = false;
    }
    // before submitting the editedCopy , compare the editedCopy with the originalValues and check whether any "keyword" is having value equals ""(ie;empty), then deleted that particular object from keyList and then call api
    let originalKeyListLength = originalValues.keyList.length;
    let editedCopyKeyListLength = editedCopy.keyList.length;
    if (editedCopyKeyListLength > originalKeyListLength) {
      for (let i = originalKeyListLength; i < editedCopyKeyListLength; i++) {
        if (editedCopy.keyList[i].keyword === "") {
          editedCopy.keyList.splice(i, 1);
        }
      }
    }
    let keyListWithModifiedValues = isKeywordDeleted(editedCopy.keyList);
    editedCopy.keyList = keyListWithModifiedValues;

    submitData(originalValues, editedCopy, { keyList: true });
  };

  const onSubmitOcrTableItems = async (columns, lineItems) => {
    let originalValues;
    let editedCopy;
    let columnsMeta;

    if (ocrData.editedCopy) {
      editedCopy = cloneDeep(ocrData.editedCopy);
      originalValues = cloneDeep(ocrData.originalValues); // this is the original copy...on lineItem key modification, the corresponding key[only key..in key/value] must be changed here..so at to get the previous value of the lineItem. for eg: if columnHeading "lotNo" has changed to "LOT NO",and the structure was like "lotNo":{oldvalue: "",newvalue:""}, then when changed, to get the old value=>rowData["LOT NO"].oldvalue ..that means key must be changed
      editedCopy.tableItems.columns = columns;
      editedCopy.tableItems.lineItems = lineItems;

      if (!editedCopy.changeSummary) {
        //in case of editing columns for the first time[keyList may have undergone edit thereby creating a editedCopy], changeSummary is created on column addition...if changeSummary not created ie; if no columns are added, then changeSummary is created at this stage while submitting data..
        let originalColumns = originalValues.tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editedCopy.changeSummary = meta;
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      } else {
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      }
    } else {
      originalValues = cloneDeep(ocrData); //used to get the id, type for setting tokenDesciption state and original KeyList and LineItems to get the highlighted values to render on submit
      editedCopy = cloneDeep(ocrData);
      editedCopy.tableItems.columns = columns;
      editedCopy.tableItems.lineItems = lineItems;
      editedCopy.id = create_UUID();
      editedCopy.originalCopy = false;

      if (!editedCopy.changeSummary) {
        //in case of editing columns for the first time, changeSummary is created on column modification...if changeSummary not created ie; if no columns are added, then changeSummary is created at this stage while submitting data..
        let originalColumns = originalValues.tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editedCopy.changeSummary = meta;
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      } else {
        columnsMeta = editedCopy.changeSummary.tableItems.columns;
      }
    }

    let isColumnEditedRes = isColumnEdited(editedCopy, columnsMeta); //checks if columnNames are changed w.r.t to originalColumn names and if so, then return lineItems with modified keys, updatedColumnsMeta and updatedColumns
    let lineItemsWithModifiedKeys = isColumnEditedRes.lineItemsWithModifiedKeys;
    let updatedColumnsMeta = isColumnEditedRes.updatedColumnsMeta;
    let updatedColumns = isColumnEditedRes.updatedColumns;

    editedCopy.tableItems.lineItems = lineItemsWithModifiedKeys;
    editedCopy.tableItems.columns = updatedColumns;
    editedCopy.changeSummary.tableItems.columns = updatedColumnsMeta;

    submitData(originalValues, editedCopy, { tableItems: true });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.ocrAttrsRoot}
    >
      {loading && (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      )}
      <Grid item className={classes.title}>
        <Grid container alignItems="baseline" justify="center">
          <Grid item>
            <Typography variant="body2" className={classes.typoGraphAttr}>
              {getResourceValueByKey(resource, "GRAPH_ATTR", "Graph Attr.")} -
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.typotitle}>
              &nbsp;{getResourceValueByKey(resource, "OCR_DATA", "OCR Data")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.detailsPanel}>
        {containsKeyList || containsTableItems ? (
          <OcrTabPanel
            resource={resource}
            selectedOcrTab={selectedOcrTab}
            setSelectedOcrTab={setSelectedOcrTab}
            containsKeyList={containsKeyList}
            highlightedKeyList={highlightedKeyList}
            refOcrKeyList={refOcrKeyList}
            editKeyList={editKeyList}
            setEditKeyList={setEditKeyList}
            addOCRkeyList={addOCRkeyList}
            loading={loading}
            onSubmitOcrKeyList={onSubmitOcrKeyList}
            containsTableItems={containsTableItems}
            refLineItems={refLineItems}
            refColumns={refColumns}
            highlightedColumns={highlightedColumns}
            highlightedLineItems={highlightedLineItems}
            editTableItems={editTableItems}
            scrollTableItems={scrollTableItems}
            setScrollTableItems={setScrollTableItems}
            setEditTableItems={setEditTableItems}
            addTableColumn={addTableColumn}
            setAddTableColumn={setAddTableColumn}
            deleteTableColumn={deleteTableColumn}
            setDeleteTableColumn={setDeleteTableColumn}
            addColumnFn={addColumnFn}
            deleteColumnFn={deleteColumnFn}
            modifyColumn={modifyColumn}
            handleChangeColumnDetails={handleChangeColumnDetails}
            addTableRow={addTableRow}
            setAddTableRow={setAddTableRow}
            deleteTableRow={deleteTableRow}
            setDeleteTableRow={setDeleteTableRow}
            addRowFn={addRowFn}
            deleteRowFn={deleteRowFn}
            modifyRow={modifyRow}
            handleChangeRowDetails={handleChangeRowDetails}
            onSubmitOcrTableItems={onSubmitOcrTableItems}
            goBack={goBack}
          />
        ) : (
          <div className={classes.centerDiv}>
            <Typography variant="body2" color={"error"}>
              {getResourceValueByKey(resource, "NO_OCR_DATA", "No OCR data!")}
            </Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default OcrAttributes;
