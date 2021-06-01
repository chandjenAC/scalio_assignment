import cloneDeep from "lodash/cloneDeep";

const compareLineItems = (originalLineItemValue, editedLineItemValue) => {
  let lineItemValue;
  if (originalLineItemValue !== "" && editedLineItemValue === "") {
    lineItemValue = {
      oldvalue: originalLineItemValue,
      newvalue: "",
    };
  } else if (originalLineItemValue !== editedLineItemValue) {
    lineItemValue = {
      oldvalue: originalLineItemValue,
      newvalue: editedLineItemValue,
    };
  } else {
    lineItemValue = originalLineItemValue;
  }
  return lineItemValue;
};

const getAddedLineItem = (value) => {
  return {
    addedAttr: true,
    oldvalue: "",
    newvalue: value,
  };
};

export const getLineItemsDiff = (
  originalLineItems,
  editedLineItems,
  editedColumns,
  columnsMeta
) => {
  let highlightedLineItems = cloneDeep(editedLineItems);

  const columnDeleted = (i, key, column, lineItem) => {
    if (key === column.originalValue) {
      if (i > originalLineItems.length - 1) {
        //if highlighedLineItems length is more than originalLineItems=> new row has been added at the array end..
        lineItem[key] = getAddedLineItem(lineItem[key]);
      } else {
        let originalLineItemValue = originalLineItems[i][column.originalValue];
        let lineItemValue = compareLineItems(
          originalLineItemValue,
          lineItem[key]
        );
        lineItem[key] = lineItemValue;
      }
    }
  };

  const columnEdited = (i, key, column, lineItem) => {
    if (key === column.originalValue) {
      if (i > originalLineItems.length - 1) {
        //if highlighedLineItems length is more than originalLineItems=> new row has been added at the array end..
        lineItem[key] = getAddedLineItem(lineItem[key]);
      } else {
        let originalLineItemValue = originalLineItems[i][column.originalValue];
        let lineItemValue = compareLineItems(
          originalLineItemValue,
          lineItem[key]
        );
        lineItem[key] = lineItemValue;
      }
    }
  };

  const columnAdded = (key, column, lineItem) => {
    if (key === column.editedValue) {
      let currentValue = lineItem[key];
      lineItem[key] = {
        addedAttr: true,
        oldvalue: "",
        newvalue: currentValue,
      };
    }
  };

  columnsMeta.map((column, index) => {
    if (column.originalValue === "") {
      //newly added column
      highlightedLineItems.map((lineItem, i) => {
        Object.keys(lineItem).map((key) => {
          return columnAdded(key, column, lineItem);
        });
      });
    } else if (column.editedValue === "") {
      if (editedColumns[index] === "") {
        //  existing column deleted
        highlightedLineItems.map((lineItem, i) => {
          Object.keys(lineItem).map((key) => {
            return columnDeleted(i, key, column, lineItem);
          });
        });
      } else {
        // an existing column without edit..
        highlightedLineItems.map((lineItem, i) => {
          Object.keys(lineItem).map((key) => {
            return columnEdited(i, key, column, lineItem);
          });
        });
      }
    }
  });
  return highlightedLineItems;
};
