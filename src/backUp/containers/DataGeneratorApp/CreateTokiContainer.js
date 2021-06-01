import { makeStyles, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import CreateToki from "../../components/dataGeneratorApp/CreateToki";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import { renderSnackbar } from "../../utils";
import { createToki } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  title: { width: "100%" },
}));

const CreateTokiContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [createTokiMutation, mutationStatus] = useMutation(createToki, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
    },
  });

  const [selectionCriteria, setSelectionCriteria] = useState("By Date Range");

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
      {
        title: getResourceValueByKey(resource, "TOKI", "Toki"),
        path: "/yogi-webb/dataGenerator/toki",
      },
    ]);
  }, []);

  const handleSelectionCriteria = (e, criteria) => {
    if (criteria) {
      setSelectionCriteria(criteria);
    }
  };

  const getHeader = () => {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.title}
        align="left"
      >
        {getResourceValueByKey(resource, "CREATE_TOKI", "Create Toki")}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <CreateToki
        resource={resource}
        isLoading={mutationStatus.isLoading}
        selectionCriteria={selectionCriteria}
        handleSelectionCriteria={handleSelectionCriteria}
        createTokiMutation={createTokiMutation}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default CreateTokiContainer;
