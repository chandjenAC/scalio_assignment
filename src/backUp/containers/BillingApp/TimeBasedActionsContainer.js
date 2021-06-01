import React, { useState } from "react";
import StyledSelect from "../../components/common/molecules/StyledSelect";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import CalculateFeeContainer from "./CalculateFeeContainer";
import GenerateInvoiceContainer from "./GenerateInvoiceContainer";

const TimeBasedActionsContainer = (props) => {
  const {
    resource,
    refetchBillingSummary,
    handleReloadTable,
    clientInfo,
  } = props;

  const [openCalculateFeePopup, setOpenCalculateFeePopup] = useState(false);
  const [openGenerateInvoicePopup, setOpenGenerateInvoicePopup] = useState(
    false
  );

  const timeBasedActionOptions = [
    {
      label: getResourceValueByKey(resource, "CALCULATE_FEE", "Calculate Fee"),
      value: "Calculate Fee",
    },
    {
      label: getResourceValueByKey(
        resource,
        "GENERATE_STATEMENT",
        "Generate Statement"
      ),
      value: "Generate Statement",
    },
  ];

  const handleChangeTimeBasedAction = (action) => {
    if (action === "Calculate Fee") {
      setOpenCalculateFeePopup(true);
    } else if (action === "Generate Statement") {
      setOpenGenerateInvoicePopup(true);
    }
  };

  return (
    <>
      <StyledSelect
        variant="outlined"
        minWidth={100}
        label={getResourceValueByKey(resource, "ACTIONS", "Actions")}
        options={timeBasedActionOptions}
        handleChange={handleChangeTimeBasedAction}
      />
      {openCalculateFeePopup && (
        <CalculateFeeContainer
          resource={resource}
          clientInfo={clientInfo}
          setOpenCalculateFeePopup={setOpenCalculateFeePopup}
          handleReloadTable={handleReloadTable}
          refetchBillingSummary={refetchBillingSummary}
        />
      )}
      {openGenerateInvoicePopup && (
        <GenerateInvoiceContainer
          resource={resource}
          clientInfo={clientInfo}
          setOpenGenerateInvoicePopup={setOpenGenerateInvoicePopup}
          handleReloadTable={handleReloadTable}
        />
      )}
    </>
  );
};

export default TimeBasedActionsContainer;
