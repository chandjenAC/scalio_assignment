import React, { useContext, useEffect } from "react";
import WorkInProgress from "../../components/WorkInProgress";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const BillingSettingsContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "BILLING", "Billing"),
        path: "/yogi-webb/billing",
      },
      {
        title: getResourceValueByKey(resource, "SETTINGS", "Settings"),
        path: "/yogi-webb/billing/settings",
      },
    ]);
  }, []);
  return <WorkInProgress />;
};

export default BillingSettingsContainer;
