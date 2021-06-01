import React, { useContext, useEffect } from "react";
import WorkInProgress from "../../components/WorkInProgress";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const SearchAppContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "SEARCH", "Search"),
        path: "/yogi-webb/task-queue",
      },
    ]);
  }, []);
  return <WorkInProgress />;
};

export default SearchAppContainer;
