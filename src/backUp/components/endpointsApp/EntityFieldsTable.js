import React from "react";
import { env } from "../../ENV";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import LookUpID from "../common/molecules/LookUpID";
import EditArrayInDialogBox from "../common/organisms/EditArrayInDialogBox";
import RenderArrayInDialogBox from "../common/organisms/RenderArrayInDialogBox";
import SelectDataType from "./SelectDataType";
import Mtable from "../common/organisms/Mtable";
import dataTypeOptions from "../../meta/dataTypeOptions.json";

const EntityFieldsTable = (props) => {
  const { resource, defsRowData, getEntityFields, updateEntityFields } = props;

  const fieldColumns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
    },
    {
      field: "name",
      title: getResourceValueByKey(resource, "FIELD_NAME", "Field Name"),
      dontTruncate: true,
    },
    {
      field: "keyword.id",
      title: getResourceValueByKey(resource, "KEYWORD", "Keyword"),
      render: (rowData) => rowData.keyword?.name,
      editComponent: (props) => (
        <LookUpID
          fieldName={"domain.id"}
          fieldId={props.rowData?.keyword?.id}
          fieldValue={props.rowData?.keyword?.name}
          label={getResourceValueByKey(resource, "KEYWORD", "Keyword")}
          onChange={props.onChange}
          url={env.KEYWORD_SEARCH}
        />
      ),
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
      field: "tags",
      title: getResourceValueByKey(resource, "IDENTIFIERS", "Identifiers"),
      render: (rowData) => {
        let buttonText =
          rowData?.tags?.length > 0
            ? `${rowData.tags.length} ${getResourceValueByKey(
                resource,
                "TAGS",
                "Tags"
              )}`
            : getResourceValueByKey(resource, "NO_TAGS", "No Tags");
        return (
          <RenderArrayInDialogBox
            array={rowData.tags}
            buttonText={buttonText}
            title={getResourceValueByKey(resource, "TAGS", "Tags")}
          />
        );
      },
      editComponent: (props) => (
        <EditArrayInDialogBox
          array={props.rowData.tags}
          title={getResourceValueByKey(resource, "TAGS", "Tags")}
          onChange={props.onChange}
        />
      ),
    },
  ];

  return (
    <Mtable
      style={{ boxShadow: "none", padding: "0px 12px" }}
      title={getResourceValueByKey(resource, "ENTITY_FIELDS", "Entity Fields")}
      columns={fieldColumns}
      data={(query) => getEntityFields(query, defsRowData)}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateEntityFields(newData);
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

export default EntityFieldsTable;
