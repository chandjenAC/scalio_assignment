export const renameLineItemKeys = (editedLineItems, oldKey, newKey) => {
  const renameKey = (key, lineItem) => {
    if (oldKey === key) {
      let value = lineItem[oldKey];
      delete lineItem[oldKey];
      lineItem[newKey] = value;
    }
  };
  editedLineItems.map((lineItem) => {
    Object.keys(lineItem).map((key) => {
      //this is the key w.r.t editedColumns..rename the key to editedColumn name
      return renameKey(key, lineItem);
    });
  });
  return editedLineItems;
};

export const setLineItemKeys = (editedLineItems, keyName) => {
  const setKey = (key, lineItem) => {
    if (keyName === key) {
      lineItem[key] = "";
    }
  };
  editedLineItems.map((lineItem) => {
    Object.keys(lineItem).map((key) => {
      return setKey(key, lineItem);
    });
  });
  return editedLineItems;
};

export const removeLineItemKeys = (editedLineItems, removeKey) => {
  const deleteKey = (key, lineItem) => {
    if (removeKey === key) {
      delete lineItem[key];
    }
  };
  editedLineItems.map((lineItem) => {
    Object.keys(lineItem).map((key) => {
      return deleteKey(key, lineItem);
    });
  });
  return editedLineItems;
};
