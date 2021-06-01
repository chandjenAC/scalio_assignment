import React, { useContext, useEffect } from "react";
import KibanaDashboard from "../../components/auditApp/KibanaDashboard";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const KibanaDashboardContainer = (props) => {
  const { resource } = props;
  const { setCrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setCrumbs([getResourceValueByKey(resource, "AUDIT", "Audit")]);
  }, []);

  return <KibanaDashboard />;
};

export default KibanaDashboardContainer;
