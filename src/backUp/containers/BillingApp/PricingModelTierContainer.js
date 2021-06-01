import React from "react";
import { Paper, Fade, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import PricingModelTier from "../../components/billingApp/PricingModelTier";
import { useSnackbar } from "notistack";
import { formatAmount, formatNumber, renderSnackbar } from "../../utils";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    borderRadius: "25px 0px 0px 0px",
  },
}));

const PricingModelTierContainer = (props) => {
  const { resource, pricingModel } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      field: "pricingValue",
      title: getResourceValueByKey(resource, "PRICING_VALUE", "Pricing Value"),
      sorting: false,
    },
    {
      field: "tierValue",
      title: getResourceValueByKey(resource, "TIER_VALUE", "Tier Value"),
      render: (rowData) => {
        return (
          <Typography variant="subtitle2">
            {pricingModel.tierBy === "TXN_COUNT"
              ? formatNumber(rowData.tierValue)
              : formatAmount(rowData.tierValue)}
          </Typography>
        );
      },
      sorting: false,
    },
  ];

  const getPricingModelTier = (query) => {
    let tiers =
      typeof pricingModel.tierValues === "string"
        ? JSON.parse(pricingModel.tierValues)
        : pricingModel.tierValues;
    let paginatedRows =
      tiers.length < query.pageSize
        ? tiers
        : tiers.slice(
            query.page * query.pageSize,
            (query.page + 1) * query.pageSize
          );
    return new Promise((resolve, reject) => {
      resolve({
        data: paginatedRows,
        page: Number(query.page),
        totalCount: Number(tiers.length),
      });
    });
  };

  const addPricingModelTier = async (newData) => {
    pricingModel.tierValues = pricingModel.tierValues || [];
    let index = pricingModel.tierValues.findIndex(
      (x) => x.tierValue === newData.tierValue
    );
    if (index > -1) pricingModel.tierValues[index] = newData;
    else pricingModel.tierValues.push(newData);
    let response = await post(env.TOP_PRICING_MODEL, pricingModel);
    renderSnackbar(enqueueSnackbar, response);
  };

  const updatePricingModelTier = async (newData, oldData) => {
    pricingModel.tierValues = pricingModel.tierValues || [];
    let index = pricingModel.tierValues.findIndex(
      (x) => x.tierValue === oldData.tierValue
    );
    if (index > -1) pricingModel.tierValues[index] = newData;
    let response = await post(env.TOP_PRICING_MODEL, pricingModel);
    renderSnackbar(enqueueSnackbar, response);
  };

  const deletePricingModelTier = async (oldData) => {
    pricingModel.tierValues = pricingModel.tierValues || [];
    let index = pricingModel.tierValues.findIndex(
      (x) => x.tierValue === oldData.tierValue
    );
    if (index > -1) pricingModel.tierValues.splice(index, 1);
    let response = await post(env.TOP_PRICING_MODEL, pricingModel);
    renderSnackbar(enqueueSnackbar, response);
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        <PricingModelTier
          resource={resource}
          columns={columns}
          getPricingModelTier={getPricingModelTier}
          addPricingModelTier={addPricingModelTier}
          updatePricingModelTier={updatePricingModelTier}
          deletePricingModelTier={deletePricingModelTier}
        />
      </Paper>
    </Fade>
  );
};

export default PricingModelTierContainer;
