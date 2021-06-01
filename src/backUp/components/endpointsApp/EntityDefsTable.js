import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import LookUpID from "../common/molecules/LookUpID";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { env } from "../../ENV";
import Mtable from "../common/organisms/Mtable";

const EntityDefsTable = (props) => {
  const {
    resource,
    getEntityDefinitions,
    addEntityDefs,
    updateEntityDefs,
    deleteEntityDefs,
    renderFieldsTable,
  } = props;

  const defColumns = [
    { field: "id", title: getResourceValueByKey(resource, "ID", "ID") },
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },
    {
      field: "domain.id",
      title: getResourceValueByKey(resource, "DOMAIN", "Domain"),
      editComponent: (props) => (
        <LookUpID
          fieldName={"id"}
          fieldId={props.rowData?.domain?.id}
          fieldValue={props.rowData?.domain?.name}
          label={getResourceValueByKey(resource, "DOMAIN", "Domain")}
          onChange={props.onChange}
          url={env.KEYWORD_DOMAIN_SEARCH}
        />
      ),
    },
    {
      field: "description",
      title: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
    },
    {
      field: "storageName",
      title: getResourceValueByKey(resource, "STORAGE_NAME", "Storage Name"),
    },
  ];

  return (
    <Mtable
      style={{ boxShadow: "none", padding: "16px" }}
      columns={defColumns}
      data={getEntityDefinitions}
      detailPanel={[
        {
          icon: tableIcons.Expand,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_ENTITY_FIELDS",
            "View entity fields"
          ),
          render: (rowData) => {
            return renderFieldsTable(rowData);
          },
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addEntityDefs(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateEntityDefs(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteEntityDefs(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        paging: true,
        detailPanelColumnAlignment: "left",
        draggable: false,
        pageSize: 15,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
};

export default EntityDefsTable;
