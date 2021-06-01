import React, { useContext, useEffect } from "react";
import { env } from "../../ENV";
import { post, del } from "../../utils/callApi";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import EntityDefsAndFieldsTable from "../../components/endpointsApp/EntityDefsAndFieldsTable";
import { useParams } from "react-router-dom";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const EntityDefsContainer = (props) => {
  const { resource } = props;
  const params = useParams();

  const endPoint = params.endPoint;
  const folderId = params.folderId;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
        path: "/yogi-webb/end-points",
      },
      {
        title: getResourceValueByKey(resource, "DEFINITIONS", "Definitions"),
        path: `/yogi-webb/end-points/${encodeURIComponent(
          endPoint
        )}/dayt/${folderId}`,
      },
      {
        title: getResourceValueByKey(resource, "ENTITIES", "Entities"),
        path: `/yogi-webb/end-points/${encodeURIComponent(
          endPoint
        )}/dayt/${folderId}/entity-defs`,
      },
    ]);
  }, []);

  const getEntityDefinitions = (query) => {
    return new Promise((resolve, reject) => {
      let filters = [
        {
          fieldName: "id",
          operator: "neq",
          values: ["NULL"],
        },
      ];
      let sort = [];
      let paging = { pageSize: query.pageSize, currentPage: query.page };
      let body = getFilterSortPaginate(filters, sort, paging);
      post(env.ENTITY_DEFINITION_SEARCH, body).then((result) => {
        if (result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
          });
        }
      });
    });
  };

  const getEntityFields = (query, rowData) => {
    return new Promise((resolve, reject) => {
      let filter = [
        {
          fieldName: "entity.id",
          operator: "eq",
          values: [rowData.id],
        },
        // {
        //   fieldName: "name",
        //   operator: "in",
        //   values: rowData.fields,
        // },
      ];
      let sort = [];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filter, sort, paging);
      post(env.ENTITY_FIELD_SEARCH, body).then((result) => {
        if (result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
          });
        }
      });
    });
  };

  const addEntityDefs = async (newData) => {
    await post(env.SAVE_ENTITY_DEFINITION, newData);
  };

  const updateEntityDefs = async (newData) => {
    await post(env.SAVE_ENTITY_DEFINITION, newData);
  };

  const updateEntityFields = async (newData) => {
    await post(env.SAVE_ENTITY_FIELD, newData);
  };

  const deleteEntityDefs = async (oldData) => {
    await del(`${env.SAVE_ENTITY_DEFINITION}/${oldData.id}`);
  };

  const getHeader = () => {
    return (
      <AppHeader
        title={getResourceValueByKey(
          resource,
          "ENTITY_DEFINITIONS",
          "Entity Defintions"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <EntityDefsAndFieldsTable
        resource={resource}
        getEntityDefinitions={getEntityDefinitions}
        getEntityFields={getEntityFields}
        addEntityDefs={addEntityDefs}
        updateEntityDefs={updateEntityDefs}
        updateEntityFields={updateEntityFields}
        deleteEntityDefs={deleteEntityDefs}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default EntityDefsContainer;
