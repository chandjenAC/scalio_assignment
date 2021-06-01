import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Loader from "../common/atoms/Loaders/Loader";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import LabelsValuesInDialog from "../common/molecules/LabelsValuesInDialog";

const AccountSpecDetails = (props) => {
  const { resource, data, isLoading, setViewSpecDetails } = props;

  const handleClose = (e) => {
    e.stopPropagation();
    setViewSpecDetails(false);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  return (
    <DialogBox
      open={true}
      showTitleDivider={true}
      handleClose={handleClose}
      dialogActions={dialogActions}
      title={getResourceValueByKey(
        resource,
        "ACCOUNT_SPECIFICATIONS",
        "Account Specifications"
      )}
    >
      {isLoading && <Loader />}
      {data && (
        <LabelsValuesInDialog
          data={[
            {
              label: getResourceValueByKey(resource, "SPEC_NAME", "Spec Name"),
              value: data?.specName,
            },
            {
              label: getResourceValueByKey(resource, "SPEC_TYPE", "Spec Type"),
              value: data?.specType,
            },
            {
              label: getResourceValueByKey(resource, "PATTERN", "Pattern"),
              value: data?.pattern,
            },
            {
              label: getResourceValueByKey(
                resource,
                "PATTERN_TYPE",
                "Pattern Type"
              ),
              value: data?.patternType,
            },
            {
              label: getResourceValueByKey(
                resource,
                "MIN._LENGTH",
                "Min. Length"
              ),
              value: `${data?.minlength} ${getResourceValueByKey(
                resource,
                "CHARACTERS",
                "Characters"
              )}`,
            },
            {
              label: getResourceValueByKey(
                resource,
                "MAX._LENGTH",
                "Max. Length"
              ),
              value: `${data?.maxlength} ${getResourceValueByKey(
                resource,
                "CHARACTERS",
                "Characters"
              )}`,
            },
            {
              label: getResourceValueByKey(resource, "VALIDATOR", "Validator"),
              value: data?.validator,
            },
            {
              label: getResourceValueByKey(
                resource,
                "BRANCH_CODE",
                "Branch Code"
              ),
              value: `${
                data?.codeSpec?.[0]?.branchCode
              } ${getResourceValueByKey(resource, "CHARACTERS", "Characters")}`,
            },
            {
              label: getResourceValueByKey(
                resource,
                "PRODUCT_CODE",
                "Product Code"
              ),
              value: `${
                data?.codeSpec?.[1]?.productCode
              } ${getResourceValueByKey(resource, "CHARACTERS", "Characters")}`,
            },
            {
              label: getResourceValueByKey(
                resource,
                "EXT._COUNT",
                "Ext. Count"
              ),
              value: `${data?.codeSpec?.[2]?.extCount} ${getResourceValueByKey(
                resource,
                "CHARACTERS",
                "Characters"
              )}`,
            },
          ]}
        />
      )}
    </DialogBox>
  );
};

export default AccountSpecDetails;
