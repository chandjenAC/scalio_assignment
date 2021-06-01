import { makeStyles, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import GenerateAssets from "../../components/dataGeneratorApp/GenerateAssets";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import { renderSnackbar } from "../../utils";
import { generateInvoice } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  title: { width: "100%" },
}));

const GenerateAssetsContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [shortCodes, setShortCodes] = useState({ buyer: "", supplier: "" });
  const [selectedBuyerName, setSelectedBuyerName] = useState("");

  const [generateInvoiceMutation, mutationStatus] = useMutation(
    generateInvoice,
    {
      onSuccess: (response) => {
        renderSnackbar(enqueueSnackbar, response);
      },
    }
  );

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(
          resource,
          "DATA_GENERATOR",
          "Data Generator"
        ),
        path: "/yogi-webb/dataGenerator",
      },
    ]);
  }, []);

  const getHeader = () => {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.title}
        align="left"
      >
        {getResourceValueByKey(resource, "GENERATE_ASSETS", "Generate Assets")}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <GenerateAssets
        resource={resource}
        isLoading={mutationStatus.isLoading}
        shortCodes={shortCodes}
        setShortCodes={setShortCodes}
        selectedBuyerName={selectedBuyerName}
        setSelectedBuyerName={setSelectedBuyerName}
        generateInvoiceMutation={generateInvoiceMutation}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default GenerateAssetsContainer;
