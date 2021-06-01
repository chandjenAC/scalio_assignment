import React from "react";
import EntityDefsTable from "./EntityDefsTable";
import EntityFieldsTable from "./EntityFieldsTable";

const EntityDefsAndFieldsTable = (props) => {
  const {
    resource,
    getEntityDefinitions,
    getEntityFields,
    addEntityDefs,
    updateEntityDefs,
    updateEntityFields,
    deleteEntityDefs,
  } = props;

  const renderFieldsTable = (defsRowData) => {
    return (
      <div style={{ padding: 10, backgroundColor: "#f4f4f4" }}>
        <EntityFieldsTable
          resource={resource}
          defsRowData={defsRowData}
          getEntityFields={getEntityFields}
          updateEntityFields={updateEntityFields}
        />
      </div>
    );
  };

  return (
    <EntityDefsTable
      resource={resource}
      getEntityDefinitions={getEntityDefinitions}
      addEntityDefs={addEntityDefs}
      updateEntityDefs={updateEntityDefs}
      deleteEntityDefs={deleteEntityDefs}
      renderFieldsTable={renderFieldsTable}
    />
  );
};

export default EntityDefsAndFieldsTable;
