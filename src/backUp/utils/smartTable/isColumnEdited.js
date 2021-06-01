import { updateColumnsMeta } from "./updateColumnsMeta";
import { getColumnsDiff } from "./getColumnsDiff";

export const isColumnEdited = (editedCopy, columnsMeta) => {
  let editedColumns = editedCopy.tableItems.columns;
  let editedLineItems = editedCopy.tableItems.lineItems; // keys of this lineItems will be changed if the column names are edited w.r.t original column names

  // let columnsMeta = editedCopy.changeSummary.tableItems.columns;
  let updatedColumnsMetaRes = updateColumnsMeta(
    columnsMeta,
    editedColumns,
    editedLineItems
  );
  let updatedColumnsMeta = updatedColumnsMetaRes.updatedColumnsMeta;
  let highlightedColumns = getColumnsDiff(updatedColumnsMeta, editedColumns);

  editedCopy.changeSummary.tableItems.columns =
    updatedColumnsMetaRes.updatedColumnsMeta;

  return {
    lineItemsWithModifiedKeys: updatedColumnsMetaRes.lineItemsWithModifiedKeys,
    updatedColumns: updatedColumnsMetaRes.updatedColumns,
    updatedColumnsMeta: updatedColumnsMeta,
    highlightedColumns: highlightedColumns,
  };
};
