import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import LookUpID from "../common/molecules/LookUpID";
import EditArrayInDialogBox from "../common/organisms/EditArrayInDialogBox";
import RenderArrayInDialogBox from "../common/organisms/RenderArrayInDialogBox";
import SelectDataType from "./SelectDataType";
import Mtable from "../common/organisms/Mtable";
import dataTypeOptions from "../../meta/dataTypeOptions.json";

const FieldTable = (props) => {
  const {
    resource,
    segmentRowData,
    handleRemoteFieldsData,
    addDocFieldsRow,
    updateDocFieldsRow,
    deleteDocFieldsRow,
  } = props;

  const fieldColumns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
    },
    {
      field: "name",
      title: getResourceValueByKey(resource, "LABEL", "Label"),
      dontTruncate: true,
    },
    {
      field: "field.id",
      title: getResourceValueByKey(resource, "ENTITY_FIELD", "Entity Field"),
      render: (rowData) => rowData.field?.name,
      editComponent: (props) => (
        <LookUpID
          fieldName={"entity.id"}
          fieldId={props.rowData?.field?.id}
          fieldValue={props.rowData?.field?.name}
          primaryFilter={{
            fieldName: "entity.id",
            operator: "eq",
            values: [segmentRowData.entityDefinitionId],
          }}
          label={getResourceValueByKey(
            resource,
            "ENTITY_FIELD",
            "Entity Field"
          )}
          onChange={props.onChange}
          url={env.ENTITY_FIELD_SEARCH}
        />
      ),
      dontTruncate: true,
    },
    {
      field: "faasId",
      title: getResourceValueByKey(resource, "FAAS_ID", "FaaS ID"),
      copy: true,
    },
    {
      field: "datatype",
      title: getResourceValueByKey(resource, "DATA_TYPE", "Data Type"),
      editComponent: (props) => (
        <SelectDataType
          resource={resource}
          label={getResourceValueByKey(resource, "DATA_TYPE", "Data Type")}
          rowData={props.rowData}
          onChange={props.onChange}
          options={dataTypeOptions}
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
          array={props.rowData.identifier?.labels}
          title={getResourceValueByKey(resource, "IDENTIFIERS", "Identifiers")}
          onChange={props.onChange}
        />
      ),
    },
  ];

  return (
    <Mtable
      style={{ boxShadow: "none", padding: "6px 12px" }}
      title={getResourceValueByKey(
        resource,
        "DOCUMENT_FIELDS",
        "Document Fields"
      )}
      columns={fieldColumns}
      data={(query) => handleRemoteFieldsData(query, segmentRowData)}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addDocFieldsRow(newData, segmentRowData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateDocFieldsRow(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteDocFieldsRow(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 10,
      }}
    />
  );
};

export default FieldTable;
