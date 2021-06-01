import React from "react";
import InstancesTable from "./InstancesTable";
import FlowsTable from "./FlowsTable";

const InstancesAndFlowsTables = (props) => {
  const {
    resource,
    getInstancesData,
    getInstanceFlowsData,
    recoverProcessInstance,
  } = props;

  const renderFlowsTable = (instancesRowData) => {
    return (
      <div style={{ padding: 10, backgroundColor: "#f4f4f4" }}>
        <FlowsTable
          resource={resource}
          instancesRowData={instancesRowData}
          getInstanceFlowsData={getInstanceFlowsData}
        />
      </div>
    );
  };

  return (
    <InstancesTable
      resource={resource}
      getInstancesData={getInstancesData}
      renderFlowsTable={renderFlowsTable}
      recoverProcessInstance={recoverProcessInstance}
    />
  );
};

export default InstancesAndFlowsTables;
