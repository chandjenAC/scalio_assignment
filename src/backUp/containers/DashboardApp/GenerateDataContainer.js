import React from "react";
import { useMutation } from "react-query";
import GenerateData from "../../components/dashboardApp/GenerateData";
import { generateEpDashboardData } from "../../utils/getData";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";

const GenerateDataContainer = (props) => {
  const {
    resource,
    anchorInitialOptions,
    setOpenGenerateDataDialog,
    // handleReloadTable,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [generateData] = useMutation(generateEpDashboardData, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      //   handleReloadTable();
      setOpenGenerateDataDialog(false);
    },
  });

  return (
    <GenerateData
      resource={resource}
      // selectedRows={selectedRows}
      anchorInitialOptions={anchorInitialOptions}
      generateData={generateData}
      setOpenGenerateDataDialog={setOpenGenerateDataDialog}
    />
  );
};

export default GenerateDataContainer;
