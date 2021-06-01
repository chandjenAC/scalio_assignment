import React, { useContext, useEffect } from "react";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import TopiqSourcesAndEvents from "../../components/topiqApp/TopiqSourcesAndEvents";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const TopiqSourcesAndEventsContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "TOPIQ", "Topiq"),
        path: "/yogi-webb/topiq",
      },
    ]);
  }, []);

  const getTopSources = (query) => {
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
      post(env.DMS_SEARCH_TOP_EVENT_SOURCE, body).then((result) => {
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

  const getTopEvents = (query, sourceRowData) => {
    return new Promise((resolve, reject) => {
      let sort = [];
      let filters = [
        {
          fieldName: "sources.id",
          operator: "eq",
          values: [sourceRowData.id],
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
      post(env.DMS_SEARCH_TOP_EVENT, body).then((result) => {
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

  const getHeader = () => {
    return (
      <AppHeader
        title={getResourceValueByKey(
          resource,
          "EVENT_SOURCES",
          "Event Sources"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <TopiqSourcesAndEvents
        resource={resource}
        getTopSources={getTopSources}
        getTopEvents={getTopEvents}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default TopiqSourcesAndEventsContainer;
