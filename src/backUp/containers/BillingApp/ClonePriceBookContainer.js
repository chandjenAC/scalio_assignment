import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { cloneExistingPriceBook } from "../../utils/getData";
import { getBillingProjects } from "../../utils/getData";
import { getPriceBooksByBillingProject } from "../../utils/getData";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import ClonePriceBook from "../../components/billingApp/ClonePriceBook";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const ClonePriceBookContainer = (props) => {
  const {
    resource,
    billingProjectId,
    setClonePriceBook,
    handleReloadTable,
  } = props;

  const currencyOptions = [
    { label: getResourceValueByKey(resource, "USD", "USD"), value: "USD" },
    { label: getResourceValueByKey(resource, "INR", "INR"), value: "INR" },
    { label: getResourceValueByKey(resource, "GBP", "GBP"), value: "GBP" },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const [selectedBillingProjectId, setSelectedBillingProjectId] = useState("");
  const [billingProjectOptions, setBillingProjectOptions] = useState([]);
  const [priceBookOptions, setPriceBookOptions] = useState([]);

  const { isLoading: loadingProjects, error: errorProjects } = useQuery(
    ["billingService_billingProjects"],
    getBillingProjects,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let options = [];
        data &&
          data.data &&
          data.data.map((item) => {
            options.push({ label: item.projectName, value: item.id });
          });
        setBillingProjectOptions(options);
      },
    }
  );

  const { isLoading: loadingPriceBooks, error: errorPriceBooks } = useQuery(
    ["billingService_priceBooks", selectedBillingProjectId],
    getPriceBooksByBillingProject,
    {
      enabled: selectedBillingProjectId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let options = [];
        data &&
          data.data &&
          data.data.map((item) => {
            options.push({ label: item.priceBookName, value: item });
          });
        setPriceBookOptions(options);
      },
    }
  );

  const [clonePriceBook] = useMutation(cloneExistingPriceBook, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleReloadTable();
      setClonePriceBook(false);
    },
  });

  const handleChangeBillingProject = (billingProjectId) => {
    setSelectedBillingProjectId(billingProjectId);
  };

  if (errorProjects || errorPriceBooks) {
    return null;
  }

  return (
    <ClonePriceBook
      resource={resource}
      billingProjectId={billingProjectId}
      selectedBillingProjectId={selectedBillingProjectId}
      clonePriceBook={clonePriceBook}
      setClonePriceBook={setClonePriceBook}
      billingProjectOptions={billingProjectOptions}
      handleChangeBillingProject={handleChangeBillingProject}
      priceBookOptions={priceBookOptions}
      currencyOptions={currencyOptions}
      loading={loadingPriceBooks || loadingProjects}
    />
  );
};

export default ClonePriceBookContainer;
