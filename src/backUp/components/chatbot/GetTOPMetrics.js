import React, { useEffect } from "react";

const GetTOPMetrics = (props) => {
  const { getTopMetrics, triggerNextStep } = props;

  useEffect(() => {
    getTopMetrics();
  });

  triggerNextStep({ trigger: "TOPMetricsRetrieved" });

  return <div>...............</div>;
};

export default GetTOPMetrics;
