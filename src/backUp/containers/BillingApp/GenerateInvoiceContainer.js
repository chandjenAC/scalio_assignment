import React from "react";
import { useMutation } from "react-query";
import GenerateInvoice from "../../components/billingApp/GenerateInvoice";
import { createBillingStatement } from "../../utils/getData";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";

const GenerateInvoiceContainer = (props) => {
  const {
    resource,
    // selectedRows,
    clientInfo,
    setOpenGenerateInvoicePopup,
    handleReloadTable,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [generateInvoice] = useMutation(createBillingStatement, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleReloadTable();
      // Query Invalidations
      // queryCache.invalidateQueries('todos')
      setOpenGenerateInvoicePopup(false);
    },
  });

  return (
    <GenerateInvoice
      resource={resource}
      // selectedRows={selectedRows}
      clientInfo={clientInfo}
      generateInvoice={generateInvoice}
      setOpenGenerateInvoicePopup={setOpenGenerateInvoicePopup}
    />
  );
};

export default GenerateInvoiceContainer;
