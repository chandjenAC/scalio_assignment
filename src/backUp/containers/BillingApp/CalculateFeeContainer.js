import React from "react";
import { useMutation } from "react-query";
import CalculateFee from "../../components/billingApp/CalculateFee";
import { calculateBillingFee } from "../../utils/getData";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";

const CalculateFeeContainer = (props) => {
  const {
    resource,
    clientInfo,
    handleReloadTable,
    refetchBillingSummary,
    setOpenCalculateFeePopup,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [calculate] = useMutation(calculateBillingFee, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      // Query Invalidations
      // queryCache.invalidateQueries('todos')
      // setCalculateFeeResponse(response);
      refetchBillingSummary();
      handleReloadTable();
      setOpenCalculateFeePopup(false);
    },
  });

  return (
    <CalculateFee
      resource={resource}
      clientInfo={clientInfo}
      // customerOptions={customerOptions}
      setOpenCalculateFeePopup={setOpenCalculateFeePopup}
      calculate={calculate}
    />
  );
};

export default CalculateFeeContainer;
