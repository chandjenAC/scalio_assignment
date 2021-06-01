import React, { useContext, useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import TopverseLogs from "../../components/investigateApp/TopverseLogs";
import { getElasticSearchPayload } from "../../utils/getPayloads/elasticSearch";
import commonResource from "../../resources/common.json";
import { Typography } from "@material-ui/core";
import AggregateAndFilterContainer from "../Common/AggregateAndFilterContainer";
import DateTimeFilterParent from "../../components/common/molecules/Filters/DateTimeFilterParent";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import AppHeader from "../../components/common/AppHeader";
import InAppLayout from "../../layouts/InAppLayout";

const boxStyle = { position: "relative" };

const TopverseLogsContainer = (props) => {
  const { padding, resource, traceId, pageSize } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    if (!traceId) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "INVESTIGATE", "Investigate"),
          path: "/yogi-webb/investigate",
        },
      ]);
    }
  }, []);

  const columns = [
    {
      field: "logtime",
      title: getResourceValueByKey(resource, "LOG_TIME", "Log Time"),
      type: "datetime",
      filterComponent: (props) => {
        return (
          <DateTimeFilterParent
            resource={commonResource}
            update={updateDateTimeFilter}
            {...props}
          />
        );
      },
      rangeFilter: true,
    },
    {
      field: "level",
      title: getResourceValueByKey(resource, "LEVEL", "Level"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-log-data-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      sorting: false,
    },
    {
      field: "service",
      title: getResourceValueByKey(resource, "SERVICE", "Service"),
      dontTruncate: true,
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-log-data-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      sorting: false,
    },
    {
      field: "message",
      title: getResourceValueByKey(resource, "MESSAGE", "Message"),
      render: (rowData) => {
        return (
          rowData.message && (
            <div style={{ width: "550px", overflow: "scroll" }}>
              <Typography variant="caption" style={{ fontWeight: 600 }}>
                {rowData.message}
              </Typography>
            </div>
          )
        );
      },
      dontTruncate: true,
      queryString: true,
      sorting: false,
    },
    {
      field: "params",
      title: getResourceValueByKey(resource, "PARAMS", "Params"),
      render: (rowData) => {
        return (
          rowData.params && (
            <div style={{ width: "550px", overflow: "scroll" }}>
              <Typography variant="caption" style={{ fontWeight: 600 }}>
                {rowData.params}
              </Typography>
            </div>
          )
        );
      },
      sorting: false,
      queryString: true,
    },
    {
      field: "traceId",
      title: getResourceValueByKey(resource, "REQUEST_ID", "Request ID"),
      defaultFilter: traceId ? traceId : "",
      sorting: false,
      queryString: true,
      copy: true,
    },
    {
      field: "spanId",
      title: getResourceValueByKey(resource, "SERVICE_ID", "Service ID"),
      sorting: false,
      queryString: true,
      copy: true,
    },
  ];

  const updateDateTimeFilter = (fromDate, toDate, props) => {
    const value = { ...props.columnDef.tableData.filterValue };
    value.gte = toDate !== "" ? toDate : null;
    value.lte = fromDate !== "" ? fromDate : null;
    props.onFilterChanged(props.columnDef.tableData.id, value);
  };

  const handleRemoteData = (query) => {
    return new Promise((resolve, reject) => {
      let queryFields = [];
      let queryValues = "";
      let must = [];
      let sort = [
        {
          logtime: {
            order: "desc",
          },
        },
      ];
      if (query.filters.length > 0 && query.filters[0].value) {
        query.filters.map((filter, index) => {
          if (filter.column.rangeFilter) {
            must.push({
              range: {
                [filter.column.field]: {
                  gte: filter.value.gte,
                  lte: filter.value.lte,
                },
              },
            });
          } else if (filter.column.queryString) {
            queryFields.push(filter.column.field);
            if (queryValues.length === 0) {
              queryValues = queryValues.concat(`*${filter.value}*`);
            } else {
              queryValues = queryValues.concat(` AND *${filter.value}*`);
            }
          } else {
            must.push({
              match_phrase: {
                [filter.column.field]: filter.value,
              },
            });
          }
        });
        if (queryFields.length > 0) {
          must.push({
            query_string: {
              fields: queryFields,
              query: queryValues,
            },
          });
        }
      }
      if (query.search !== "") {
        must.push({ query_string: { query: `*${query.search}*` } });
      }
      if (query.orderBy) {
        sort = [
          {
            [query.orderBy.field]: {
              order: query.orderDirection,
            },
          },
        ];
      }
      let from = query.page === 0 ? 0 : query.page * query.pageSize + 1;
      let paging = { pageSize: query.pageSize, from: from };
      let body = getElasticSearchPayload(
        "log",
        "topverse-log-data-*",
        must,
        paging,
        sort
      );
      post(env.ELASTIC_SEARCH, body).then((result) => {
        if (Array.isArray(result?.data) && result?.data?.length > 0) {
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
          "TOPVERSE_LOGS",
          "Topverse Logs"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <TopverseLogs
        padding={padding}
        resource={resource}
        columns={columns}
        handleRemoteData={handleRemoteData}
        pageSize={pageSize}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default TopverseLogsContainer;
