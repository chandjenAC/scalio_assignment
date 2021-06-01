import React from "react";
import Mtable from "../common/organisms/Mtable";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const mTableStyle = { boxShadow: "none", padding: "0px 12px" };

const PricingModelTier = (props) => {
  const {
    resource,
    columns,
    getPricingModelTier,
    addPricingModelTier,
    updatePricingModelTier,
    deletePricingModelTier,
  } = props;
  return (
    <Mtable
      style={mTableStyle}
      title={getResourceValueByKey(
        resource,
        "PRICING_MODEL_TIER",
        "Pricing Model Tier"
      )}
      columns={columns}
      data={getPricingModelTier}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addPricingModelTier(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updatePricingModelTier(newData, oldData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deletePricingModelTier(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 5,
      }}
    />
  );
};

export default PricingModelTier;
