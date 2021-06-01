import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import SelectMolecule from "../common/molecules/SelectMolecule";
import RenderArrayInDialogBox from "../common/organisms/RenderArrayInDialogBox";
import EditArrayInDialogBox from "../common/organisms/EditArrayInDialogBox";
import Mtable from "../common/organisms/Mtable";

const SegmentTable = (props) => {
  const {
    resource,
    updateDocSegsRow,
    handleRemoteSegmentsData,
    renderFieldTable,
  } = props;

  const partTypeOptions = [
    {
      label: getResourceValueByKey(resource, "HEADER", "Header"),
      value: "header",
    },
    {
      label: getResourceValueByKey(resource, "DETAIL", "Detail"),
      value: "detail",
    },
    {
      label: getResourceValueByKey(resource, "FOOTER", "Footer"),
      value: "footer",
    },
  ];

  const segmentColumns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
    },
    {
      field: "name",
      title: getResourceValueByKey(resource, "PART_NAME", "Part Name"),
      dontTruncate: true,
    },

    {
      field: "parser.function",
      title: getResourceValueByKey(resource, "PARSER_FUNCTION", "Parser Fn."),
    },
    {
      field: "segmenttype",
      title: getResourceValueByKey(resource, "PART_TYPE", "Part Type"),
      editComponent: (props) => (
        <SelectMolecule
          label={getResourceValueByKey(resource, "PART_TYPE", "Part Type")}
          defaultValue={props.rowData.segmenttype}
          onChange={props.onChange}
          options={partTypeOptions}
        />
      ),
    },
    {
      field: "identifier.labels",
      title: getResourceValueByKey(resource, "IDENTIFIERS", "Identifiers"),
      render: (rowData) => {
        let buttonText =
          rowData?.identifier?.labels?.length > 0
            ? `${rowData.identifier.labels.length} ${getResourceValueByKey(
                resource,
                "LABELS",
                "Labels"
              )}`
            : getResourceValueByKey(
                resource,
                "NO_IDENTIFIERS",
                "No Identifiers!"
              );
        return (
          <RenderArrayInDialogBox
            array={rowData.identifier.labels}
            buttonText={buttonText}
            title={getResourceValueByKey(
              resource,
              "IDENTIFIERS",
              "Identifiers"
            )}
          />
        );
      },
      editComponent: (props) => (
        <EditArrayInDialogBox
          array={props.rowData.identifier.labels}
          title={getResourceValueByKey(resource, "IDENTIFIERS", "Identifiers")}
          onChange={props.onChange}
        />
      ),
    },
  ];
  return (
    <Mtable
      style={{ boxShadow: "none", padding: "16px" }}
      title={getResourceValueByKey(
        resource,
        "DOCUMENT_PARTS",
        "Document Parts"
      )}
      columns={segmentColumns}
      data={handleRemoteSegmentsData}
      detailPanel={[
        {
          icon: tableIcons.Expand,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_DOCUMENT_FIELDS",
            "View Document Fields"
          ),
          render: (rowData) => {
            return renderFieldTable(rowData);
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateDocSegsRow(newData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        paging: false,
        detailPanelColumnAlignment: "left",
        draggable: false,
        pageSize: 5,
        maxBodyHeight: 670,
      }}
    />
  );
};

export default SegmentTable;
