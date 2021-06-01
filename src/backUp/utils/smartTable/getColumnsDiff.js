export const getColumnsDiff = (columnsMeta, editedColumns) => {
  let highlightedColumns = []; //is returned from this function and used to render highlights in table
  columnsMeta.map((column, index) => {
    let value;
    if (column.originalValue === "") {
      //newly added column
      value = {
        addedAttr: true,
        oldvalue: "",
        newvalue: column.editedValue,
      };
    } else if (column.editedValue === "") {
      //2 cases
      if (editedColumns[index] === "") {
        //  existing column deleted
        value = {
          oldvalue: column.originalValue,
          newvalue: "",
        };
      } else {
        // an existing column without edit..
        value = column.originalValue;
      }
    } else {
      //column name edited
      value = {
        oldvalue: column.originalValue,
        newvalue: column.editedValue,
      };
    }
    highlightedColumns.push(value);
  });
  return highlightedColumns;
};
