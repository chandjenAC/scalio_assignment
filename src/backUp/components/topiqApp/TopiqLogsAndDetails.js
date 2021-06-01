import React from "react";
import TopiqLogs from "./TopiqLogs";
import TopiqLogDetails from "./TopiqLogDetails";

const TopiqLogsAndDetails = (props) => {
  const { resource, getTopiqLogs, getTopiqLogDetails } = props;

  const renderLogDetails = (logRowData) => {
    return (
      <div style={{ padding: 10, backgroundColor: "#f4f4f4" }}>
        <TopiqLogDetails
          resource={resource}
          logRowData={logRowData}
          getTopiqLogDetails={getTopiqLogDetails}
        />
      </div>
    );
  };

  return (
    <TopiqLogs
      resource={resource}
      getTopiqLogs={getTopiqLogs}
      renderLogDetails={renderLogDetails}
    />
  );
};

export default TopiqLogsAndDetails;
