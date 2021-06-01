import React, { useContext, useEffect } from "react";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import { post, del } from "../../utils/callApi";
import { env } from "../../ENV";
import EndpointRegistryTable from "../../components/endpointsApp/EndpointRegistryTable";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import SubTypeSelect from "./SubTypeSelect";
import EndpointTypeSelect from "./EndpointTypeSelect";
import LookUpID from "../../components/common/molecules/LookUpID";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const EndpointRegistryContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
        path: "/yogi-webb/end-points",
      },
    ]);
  }, []);

  const registryColumns = [
    {
      field: "networkId",
      title: getResourceValueByKey(resource, "NETWORK_ID", "Network ID"),
    },
    {
      field: "tenantId",
      title: getResourceValueByKey(resource, "TENANT_ID", "Tenant ID"),
    },
    {
      field: "sponsorId",
      title: getResourceValueByKey(resource, "SPONSOR_ID", "Sponsor ID"),
    },
    {
      field: "starfleetId",
      title: getResourceValueByKey(resource, "STARFLEET_ID", "Starfleet ID"),
    },
    {
      field: "anchorId",
      title: getResourceValueByKey(resource, "ANCHOR_ID", "Anchor ID"),
    },
    {
      field: "avatarId",
      title: getResourceValueByKey(resource, "AVATAR_ID", "Avatar ID"),
    },
    {
      field: "category",
      title: getResourceValueByKey(resource, "CATEGORY", "Category"),
    },
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },
    {
      field: "endPointType",
      title: getResourceValueByKey(resource, "ENDPOINT_TYPE", "Endpoint Type"),
      editComponent: (props) => (
        <EndpointTypeSelect resource={resource} {...props} />
      ),
    },
    {
      field: "subType",
      title: getResourceValueByKey(resource, "SUBTYPE", "Subtype"),
      editComponent: (props) => (
        <SubTypeSelect resource={resource} {...props} />
      ),
    },
    {
      field: "linkedTxnType",
      title: getResourceValueByKey(
        resource,
        "LINKED_TXN_TYPE",
        "Linked Txn. Type",
        "Linked Txn. Type"
      ),
      editComponent: (props) => (
        <LookUpID
          fieldName={"id"}
          fieldValue={props.rowData?.linkedTxnType}
          label={getResourceValueByKey(
            resource,
            "LINKED_TXN_TYPE",
            "Linked Txn. Type",
            "Linked Txn. Type"
          )}
          onChange={props.onChange}
          url={env.ENTITY_DEFINITION_SEARCH}
        />
      ),
    },
    {
      field: "isOutgoing",
      title: getResourceValueByKey(resource, "IS_OUTGOING", "Is Outgoing"),
      type: "boolean",
    },
    {
      field: "endPoint",
      title: getResourceValueByKey(resource, "FOLDER", "Folder"),
    },
  ];

  const getFolderRegistry = (query) => {
    return new Promise((resolve, reject) => {
      let filters = [];
      let sort = [
        {
          fieldName: "name",
          sortOrder: "ASC",
        },
      ];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filters, sort, paging);

      post(env.TOP_FOLDER_REGISTRY, body).then((result) => {
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

  const updateEndpointsRow = async (newData) => {
    await post(env.SAVE_TOP_FOLDER_REGISTRY, newData);
  };

  const addEndpointsRow = async (newData) => {
    await post(env.SAVE_TOP_FOLDER_REGISTRY, newData);
  };

  const deleteEndpointsRow = async (oldData) => {
    let body = { id: oldData.id };
    await del(env.SAVE_TOP_FOLDER_REGISTRY, body);
  };

  const getHeader = () => {
    return (
      <AppHeader
        title={getResourceValueByKey(resource, "REGISTRY", "Registry")}
      />
    );
  };

  const getMainSection = () => {
    return (
      <EndpointRegistryTable
        resource={resource}
        registryColumns={registryColumns}
        getFolderRegistry={getFolderRegistry}
        updateEndpointsRow={updateEndpointsRow}
        addEndpointsRow={addEndpointsRow}
        deleteEndpointsRow={deleteEndpointsRow}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default EndpointRegistryContainer;
