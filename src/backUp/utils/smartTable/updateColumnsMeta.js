import { renameLineItemKeys } from "./modifyLineItemKeys";
import { removeLineItemKeys } from "./modifyLineItemKeys";
import { setLineItemKeys } from "./modifyLineItemKeys";
import cloneDeep from "lodash/cloneDeep";

export const updateColumnsMeta = (
  columnsMeta,
  editedColumns,
  editedLineItems
) => {
  let updatedColumnsMeta = [];
  let updatedColumns = cloneDeep(editedColumns);
  columnsMeta.map((column, index) => {
    if (column.originalValue === "") {
      //for newly added column ..3 cases

      if (editedColumns[index] === "") {
        //newly added column is deleted
        let currentKey = column.editedValue;
        editedLineItems = removeLineItemKeys(editedLineItems, currentKey);
        updatedColumns.splice(index, 1);
      } else if (column.editedValue === editedColumns[index]) {
        //newly added column untouched
        updatedColumnsMeta.push(column);
      } else {
        //newly added column name is edited
        let columnMeta = {
          originalValue: "",
          editedValue: editedColumns[index],
        };
        let currentKey = column.editedValue;
        let editedKey = editedColumns[index];
        editedLineItems = renameLineItemKeys(
          editedLineItems,
          currentKey,
          editedKey
        );
        updatedColumnsMeta.push(columnMeta);
      }
    } else if (column.editedValue === "") {
      //3 cases

      if (editedColumns[index] === "") {
        //column deleted
        let originalKey = column.originalValue;
        editedLineItems = setLineItemKeys(editedLineItems, originalKey);
        updatedColumnsMeta.push(column);
      } else if (column.originalValue === editedColumns[index]) {
        //column untouced
        updatedColumnsMeta.push(column);
      } else if (column.originalValue !== editedColumns[index]) {
        //column name modified
        let columnMeta = {
          originalValue: column.originalValue,
          editedValue: editedColumns[index],
        };
        let currentKey = column.originalValue;
        let editedKey = editedColumns[index];
        editedLineItems = renameLineItemKeys(
          editedLineItems,
          currentKey,
          editedKey
        );
        updatedColumnsMeta.push(columnMeta);
      }
    } else if (column.editedValue !== "") {
      //2 cases

      if (editedColumns[index] === "") {
        //column deleted
        let columnMeta = {
          originalValue: column.originalValue,
          editedValue: "",
        };
        let originalKey = column.originalValue;
        let currentKey = column.editedValue;
        editedLineItems = setLineItemKeys(editedLineItems, currentKey);
        editedLineItems = renameLineItemKeys(
          editedLineItems,
          currentKey,
          originalKey
        );
        updatedColumnsMeta.push(columnMeta);
      } else if (column.editedValue !== editedColumns[index]) {
        //column name modified
        let columnMeta = {
          originalValue: column.originalValue,
          editedValue: editedColumns[index],
        };
        let currentKey = column.editedValue;
        let editedKey = editedColumns[index];
        editedLineItems = renameLineItemKeys(
          editedLineItems,
          currentKey,
          editedKey
        );
        updatedColumnsMeta.push(columnMeta);
      } else if (column.editedValue === editedColumns[index]) {
        //column name untouched
        updatedColumnsMeta.push(column);
      }
    }
  });
  return {
    updatedColumns: updatedColumns, // newly added columns when deleted it is represented by "" in editedColumns...this empty string is deleted and returned in updatedColumns[Note: this is performed only for newly added columns, the existing columns when deleted will still be represented by value ""]
    updatedColumnsMeta: updatedColumnsMeta,
    lineItemsWithModifiedKeys: editedLineItems,
  };
};
