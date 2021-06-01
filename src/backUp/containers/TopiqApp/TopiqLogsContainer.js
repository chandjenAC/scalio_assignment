import React, { useContext, useEffect } from "react";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import TopiqLogsAndDetails from "../../components/topiqApp/TopiqLogsAndDetails";
import { useParams } from "react-router-dom";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const TopiqLogsContainer = (props) => {
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
        title: getResourceValueByKey(resource, "LOGS", "Logs"),
        path: `/yogi-webb/topiq/${triggerId}/topiqs`,
      },
    ]);
  }, []);

  const getTopiqLogs = (query) => {
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
      post(env.DMS_SEARCH_TOPIQ_LOG, body).then((result) => {
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

  const getTopiqLogDetails = (query, logRowData) => {
    return new Promise((resolve, reject) => {
      let sort = [];
      let filters = [
        {
          fieldName: "log.id",
          operator: "eq",
          values: [logRowData.id],
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
      post(env.DMS_SEARCH_TOPIQ_LOG_DETAIL, body).then((result) => {
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
        title={`${triggerId}- ${getResourceValueByKey(
          resource,
          "LOGS",
          "Logs"
        )}`}
      />
    );
  };

  const getMainSection = () => {
    return (
      <TopiqLogsAndDetails
        resource={resource}
        getTopiqLogs={getTopiqLogs}
        getTopiqLogDetails={getTopiqLogDetails}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default TopiqLogsContainer;
