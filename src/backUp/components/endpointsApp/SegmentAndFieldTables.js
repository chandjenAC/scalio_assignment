import React from "react";
import FieldTable from "./FieldTable";
import SegmentTable from "./SegmentTable";

const SegmentAndFieldTables = (props) => {
  const {
    resource,
    handleRemoteSegmentsData,
    updateDocSegsRow,
    handleRemoteFieldsData,
    addDocFieldsRow,
    updateDocFieldsRow,
    deleteDocFieldsRow,
  } = props;

  const renderFieldTable = (segmentRowData) => {
    return (
      <div style={{ padding: 10, backgroundColor: "#f4f4f4" }}>
        <FieldTable
          resource={resource}
          segmentRowData={segmentRowData}
          handleRemoteFieldsData={handleRemoteFieldsData}
          addDocFieldsRow={addDocFieldsRow}
          updateDocFieldsRow={updateDocFieldsRow}
          deleteDocFieldsRow={deleteDocFieldsRow}
        />
      </div>
    );
  };

  return (
    <SegmentTable
      resource={resource}
      updateDocSegsRow={updateDocSegsRow}
      handleRemoteSegmentsData={handleRemoteSegmentsData}
      renderFieldTable={renderFieldTable}
    />
  );
};

export default SegmentAndFieldTables;
