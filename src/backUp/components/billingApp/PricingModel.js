import React from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const PricingModel = (props) => {
  const {
    resource,
    columns,
    getPricingModel,
    addPricingModel,
    updatePricingModel,
    deletePricingModel,
    renderPricingModelTier,
  } = props;

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "0px 16px",
      }}
      columns={columns}
      data={getPricingModel}
      detailPanel={[
        (rowData) => ({
          disabled: rowData.tierBy === "NONE",
          icon: tableIcons.Expand,
          tooltip:
            rowData.tierBy === "NONE"
              ? null
              : getResourceValueByKey(
                  resource,
                  "VIEW_PRICING_MODEL_TIER",
                  "View pricing model tier"
                ),
          render: (rowData) => {
            return renderPricingModelTier(rowData);
          },
        }),
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addPricingModel(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updatePricingModel(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deletePricingModel(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        paging: true,
        detailPanelColumnAlignment: "left",
        draggable: false,
        pageSize: 20,
        maxBodyHeight: 575,
      }}
    />
  );
};

export default PricingModel;
