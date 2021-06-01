import React from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const PriceBooks = (props) => {
  const {
    resource,
    columns,
    getPriceBooks,
    addPriceBooks,
    updatePriceBooks,
    deletePriceBooks,
    setClonePriceBook,
    reloadTable,
    viewPricingModel,
  } = props;


  return (
    <Mtable
      style={{ boxShadow: "none", padding: "0px 12px" }}
      title={getResourceValueByKey(resource, "PRICE_BOOKS", "Price Books")}
      reload={reloadTable}
      columns={columns}
      data={getPriceBooks}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addPriceBooks(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updatePriceBooks(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deletePriceBooks(oldData);
              resolve();
            }, 1000);
          }),
      }}
      actions={[
        {
          icon: tableIcons.View,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_PRICING_MODEL",
            "View pricing model"
          ),
          onClick: (e, rowData) => viewPricingModel(rowData),
        },

        {
          icon: tableIcons.Clone,
          tooltip: getResourceValueByKey(
            resource,
            "CLONE_AN_EXISTING_PRICE_BOOK",
            "Clone an existing Price Book"
          ),
          isFreeAction: true,
          onClick: (event, rowData) => {
            setClonePriceBook(true);
          },
        },
      ]}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 5,
      }}
    />
  );
};

export default PriceBooks;
