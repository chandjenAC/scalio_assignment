import React, { useContext, useEffect } from "react";
import FaasRegistryGrid from "../../components/faasRegistryApp/FaasRegistryGrid";
import { env } from "../../ENV";
import { post, del } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import { TextField, Typography } from "@material-ui/core";
import SelectMolecule from "../../components/common/molecules/SelectMolecule";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const FaasRegistryContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(
          resource,
          "FAAS-REGISTRY",
          "FaaS-Registry"
        ),
        path: "/yogi-webb/faas-registry",
      },
    ]);
  }, []);

  const typeOptions = [
    {
      label: getResourceValueByKey(resource, "SYNC", "SYNC"),
      value: "SYNC",
    },
    {
      label: getResourceValueByKey(resource, "ASYNC", "ASYNC"),
      value: "ASYNC",
    },
  ];

  const columns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
      copy: true,
    },
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },
    {
      field: "faas",
      title: getResourceValueByKey(resource, "FAAS", "FaaS"),
      copy: true,
      render: (rowData) => {
        let splitted = rowData.faas.split(";");
        return (
          <div style={{ minWidth: 500 }}>
            {splitted.map((i, key) => {
              return (
                <div key={key}>
                  {key === splitted.length - 1 ? (
                    <Typography
                      key={key}
                      variant="caption"
                      style={{ fontWeight: 600 }}
                    >{`${i}`}</Typography>
                  ) : (
                    <Typography
                      key={key}
                      variant="caption"
                      style={{ fontWeight: 600 }}
                    >{`${i};`}</Typography>
                  )}
                </div>
              );
            })}
          </div>
        );
      },
      editComponent: (props) => (
        <TextField
          style={{ minWidth: 500 }}
          label={getResourceValueByKey(resource, "FAAS", "FaaS")}
          multiline
          value={props.rowData.faas}
          onChange={(e) => {
            let newValue = JSON.parse(JSON.stringify(e.target.value));
            props.onChange(newValue);
          }}
        />
      ),
    },
    {
      field: "type",
      title: getResourceValueByKey(resource, "TYPE", "Type"),
      editComponent: (props) => (
        <SelectMolecule
          label={getResourceValueByKey(resource, "TYPE", "Type")}
          defaultValue={props.rowData.type}
          onChange={props.onChange}
          options={typeOptions}
        />
      ),
    },
    {
      field: "module",
      title: getResourceValueByKey(resource, "MODULE", "Module"),
    },
    {
      field: "description",
      title: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
      dontTruncate: true,
    },
  ];

  const handleRemoteData = (query) => {
    return new Promise((resolve, reject) => {
      let sort = [];
      let filters = [];
      if (query.filters.length > 0) {
        query.filters.map((filter) => {
          filters.push({
            fieldName: filter.column.field,
            operator: "like",
            values: [filter.value],
          });
        });
      }
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filters, sort, paging);
      post(env.DMS_SEARCH_TOP_FAAS, body).then((result) => {
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

  const addFaasRegistryRow = async (newData) => {
    await post(env.DMS_SAVE_TOP_FAAS, newData);
  };

  const updateFaasRegistryRow = async (newData) => {
    await post(env.DMS_SAVE_TOP_FAAS, newData);
  };

  const deleteFaasRegistryRow = async (oldData) => {
    await del(`${env.DMS_SAVE_TOP_FAAS}/${oldData.id}`);
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
      <FaasRegistryGrid
        resource={resource}
        columns={columns}
        handleRemoteData={handleRemoteData}
        addFaasRegistryRow={addFaasRegistryRow}
        updateFaasRegistryRow={updateFaasRegistryRow}
        deleteFaasRegistryRow={deleteFaasRegistryRow}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default FaasRegistryContainer;
