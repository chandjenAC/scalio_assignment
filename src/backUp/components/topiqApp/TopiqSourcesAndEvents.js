import React from "react";
import TopiqSources from "./TopiqSources";
import TopiqEvents from "./TopiqEvents";

const TopiqSourcesAndEvents = (props) => {
  const { resource, getTopSources, getTopEvents } = props;

  const renderEventDetails = (sourceRowData) => {
    return (
      <div style={{ padding: 10, backgroundColor: "#f4f4f4" }}>
        <TopiqEvents
          resource={resource}
          sourceRowData={sourceRowData}
          getTopEvents={getTopEvents}
        />
      </div>
    );
  };

  return (
    <TopiqSources
      resource={resource}
      getTopSources={getTopSources}
      renderEventDetails={renderEventDetails}
    />
  );
};

export default TopiqSourcesAndEvents;
