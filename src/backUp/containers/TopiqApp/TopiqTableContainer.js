import React, { useContext, useEffect } from "react";
import { env } from "../../ENV";
import { post, del } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import SelectMolecule from "../../components/common/molecules/SelectMolecule";
import TopiqTable from "../../components/topiqApp/TopiqTable";
import LookUpID from "../../components/common/molecules/LookUpID";
import ViewCodeInDialogBox from "../../components/common/organisms/ViewCodeInDialogBox";
import MulitlineEditInDialogBox from "../../components/common/organisms/MulitlineEditInDialogBox";
import { useParams } from "react-router-dom";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const TopiqTableContainer = (props) => {
  const { resource } = props;
  const params = useParams();

  const triggerId = params.triggerId;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "TOPIQ", "Topiq"),
        path: "/yogi-webb/topiq",
      },
      {
        title: getResourceValueByKey(resource, "DETAILS", "Details"),
        path: `/yogi-webb/topiq/${triggerId}/topiqs`,
      },
    ]);
  }, []);

  const typeOptions = [
    {
      label: getResourceValueByKey(resource, "SYSTEM", "System"),
      value: "system",
    },
    {
      label: getResourceValueByKey(resource, "MANUAL", "Manual"),
      value: "manual",
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
      field: "trigger.id",
      title: getResourceValueByKey(resource, "TRIGGER", "Trigger"),
      editComponent: (props) => (
        <LookUpID
          fieldName={"id"}
          fieldId={props.rowData?.trigger?.id}
          fieldValue={props.rowData?.trigger?.name}
          label={getResourceValueByKey(resource, "TRIGGER", "Trigger")}
          onChange={props.onChange}
          url={env.KEYWORD_DOMAIN_SEARCH}
        />
      ),
      copy: true,
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
      field: "category",
      title: getResourceValueByKey(resource, "CATEGORY", "Category"),
      dontTruncate: true,
    },
    {
      field: "enabled",
      title: getResourceValueByKey(resource, "ENABLED", "Enabled"),
      type: "boolean",
    },
    {
      field: "recipe",
      title: getResourceValueByKey(resource, "RECIPE", "Recipe"),
      copy: true,
      render: (rowData) => (
        <ViewCodeInDialogBox
          code={rowData.recipe}
          title={getResourceValueByKey(resource, "RECIPE", "Recipe")}
          buttonText={getResourceValueByKey(resource, "VIEW", "View")}
        />
      ),
      editComponent: (props) => (
        <MulitlineEditInDialogBox
          multilineText={props.rowData.recipe}
          label={getResourceValueByKey(resource, "RECIPE", "Recipe")}
          title={getResourceValueByKey(resource, "RECIPE", "Recipe")}
          buttonText={getResourceValueByKey(resource, "EDIT", "Edit")}
        />
      ),
    },
  ];

  const getTopiqs = (query) => {
    return new Promise((resolve, reject) => {
      let sort = [];
      let filters = [
        {
          fieldName: "trigger.id",
          operator: "eq",
          values: [triggerId],
        },
      ];
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
      post(env.DMS_SEARCH_TOPIQ, body).then((result) => {
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

  const addTopiqRow = async (newData) => {
    await post(env.DMS_SAVE_TOPIQ, newData);
  };

  const updateTopiqRow = async (newData) => {
    await post(env.DMS_SAVE_TOPIQ, newData);
  };

  const deleteTopiqRow = async (oldData) => {
    await del(`${env.DMS_SAVE_TOPIQ}/${oldData.id}`);
  };

  const getHeader = () => {
    return <AppHeader title={triggerId} />;
  };

  const getMainSection = () => {
    return (
      <TopiqTable
        resource={resource}
        columns={columns}
        getTopiqs={getTopiqs}
        addTopiqRow={addTopiqRow}
        updateTopiqRow={updateTopiqRow}
        deleteTopiqRow={deleteTopiqRow}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default TopiqTableContainer;
