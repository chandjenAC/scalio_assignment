export const createColumnsMeta = (originalColumns) => {
  let initialColumnsMeta = [];
  originalColumns.map((column) => {
    initialColumnsMeta.push({ originalValue: column, editedValue: "" });
  });
  return initialColumnsMeta;
};
