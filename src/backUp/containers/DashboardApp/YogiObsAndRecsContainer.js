import React, { useMemo } from "react";
import YogiObsAndRecs from "../../components/dashboardApp/YogiObsAndRecs";

const YogiObsAndRecsContainer = (props) => {
  const {
    resource,
    epDashboardData,
    recommendationsMeta,
    observationsMeta,
  } = props;

  const getRecommendationsData = () => {
    return epDashboardData[recommendationsMeta.dataKey];
  };
  const recommendationsData = useMemo(() => getRecommendationsData(), [
    epDashboardData,
  ]);

  const getObservationsData = () => {
    return epDashboardData[observationsMeta.dataKey];
  };
  const observationsData = useMemo(() => getObservationsData(), [
    epDashboardData,
  ]);

  return (
    <YogiObsAndRecs
      resource={resource}
      observations={observationsData}
      recommendations={recommendationsData}
    />
  );
};

export default YogiObsAndRecsContainer;
