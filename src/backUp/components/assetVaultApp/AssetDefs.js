import React, { useState } from "react";
import Mtable from "../common/organisms/Mtable";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import PreJsonInDialogBox from "../../components/common/organisms/PreJsonInDialogBox";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import isEmpty from "lodash/isEmpty";

const AssetDefs = (props) => {
  const { resource, getDefinitions } = props;

  const [viewModel, setViewModel] = useState(false);
  const [viewIndexing, setViewIndexing] = useState(false);
  const [viewRelationships, setViewRelationships] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const columns = [
    // {
    //   field: "id",
    //   title: getResourceValueByKey(resource, "ID", "ID"),
    //   copy: true,
    // },
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },
    {
      field: "description",
      title: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
      dontTruncate: true,
    },
    {
      field: "category",
      title: getResourceValueByKey(resource, "CATEGORY", "Category"),
      dontTruncate: true,
    },
  ];
  return (
    <>
      {viewModel && (
        <PreJsonInDialogBox
          json={JSON.stringify(selectedRow.model)}
          title={getResourceValueByKey(resource, "MODEL", "Model")}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewModel}
        />
      )}
      {viewIndexing && (
        <PreJsonInDialogBox
          json={JSON.stringify(selectedRow.indexing)}
          title={getResourceValueByKey(resource, "INDEXING", "Indexing")}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewIndexing}
        />
      )}
      {viewRelationships && (
        <PreJsonInDialogBox
          json={
            !isEmpty(selectedRow.relationships)
              ? JSON.stringify(selectedRow.relationships)
              : selectedRow.relationships
          }
          title={getResourceValueByKey(
            resource,
            "RELATIONSHIPS",
            "Relationships"
          )}
          errorText={getResourceValueByKey(
            resource,
            "NOT_AVAILABLE!",
            "Not available!"
          )}
          setViewContext={setViewRelationships}
        />
      )}
      <Mtable
        style={{ boxShadow: "none", padding: "16px" }}
        columns={columns}
        data={getDefinitions}
        actions={[
          {
            icon: tableIcons.Model,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_MODEL",
              "View model"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewModel(true);
            },
          },
          {
            icon: tableIcons.Index,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_INDEXING",
              "View indexing"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewIndexing(true);
            },
          },
          {
            icon: tableIcons.Relationships,
            tooltip: getResourceValueByKey(
              resource,
              "VIEW_RELATIONSHIPS",
              "View relationships"
            ),
            onClick: (e, rowData) => {
              setSelectedRow(rowData);
              setViewRelationships(true);
            },
          },
        ]}
        options={{
          search: false,
          sorting: false,
          draggable: false,
          pageSize: 15,
          pageSizeOptions: [5, 10, 15],
        }}
      />
    </>
  );
};

export default AssetDefs;
