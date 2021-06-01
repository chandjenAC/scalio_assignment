import React, { useContext, useEffect } from "react";
import WorkInProgress from "../../components/WorkInProgress";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const YogiTrainingContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(
          resource,
          "YOGI_TRAINING",
          "Yogi Training"
        ),
        path: "/yogi-webb/yogi-training",
      },
    ]);
  }, []);

  return <WorkInProgress />;
};

export default YogiTrainingContainer;
