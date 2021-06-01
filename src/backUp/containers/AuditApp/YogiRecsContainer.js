import React from "react";
import YogiObsAndRecs from "../../components/dashboardApp/YogiObsAndRecs";

const YogiRecsContainer = (props) => {
  const { resource } = props;

  let recommendations = [
    {
      id: "2757c482-10f1-4a24-b9d7-1818058d1cb5",
      displayName: "Recommendation 01",
      displayInfo: {
        primaryText:
          "20% of rejections are due to max funding amount, increase daily funding amount to capitalize on revenues",
      },
    },
    {
      id: "2c51db44-ff56-47af-b32e-009f0e7c974b",
      displayName: "Recommendation 02",
      displayInfo: {
        primaryText: "Recommendation text here.",
      },
    },
    {
      id: "1e3bb71a-ca92-4e01-8487-fbb9e7818760",
      displayName: "Recommendation 03",
      displayInfo: {
        primaryText: "Recommendation text here.",
      },
    },
    {
      id: "902baea7-71c6-47cb-b6d2-360de0ef02d5",
      displayName: "Recommendation 04",
      displayInfo: {
        primaryText: "Recommendation text here.",
      },
    },
    {
      id: "10db89ba-c05f-4818-9767-300289c4b3a2",
      displayName: "Recommendation 05",
      displayInfo: {
        primaryText: "Recommendation text here.",
      },
    },
    {
      id: "5bae3b7d-0212-4014-9a18-8ea0346da132",
      displayName: "Recommendation 06",
      displayInfo: {
        primaryText: "Recommendation text here.",
      },
    },
  ];

  let observations = [
    {
      id: "39ac2f1d-bff6-4003-a56f-f2bc89022bfe",
      displayName: "Observation 01",
      displayInfo: {
        primaryText: "Increase daily funding amount to capitalize on revenues",
      },
    },
    {
      id: "4b503fd6-da34-4af9-b9d8-e7d41a327581",
      displayName: "Observation 02",
      displayInfo: {
        primaryText: "Observation text here.",
      },
    },
  ];
  return (
    <YogiObsAndRecs
      resource={resource}
      observations={observations}
      recommendations={recommendations}
    />
  );
};

export default YogiRecsContainer;
