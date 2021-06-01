import React, { useContext, useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import TopverseTraces from "../../components/investigateApp/TopverseTraces";
import { getElasticSearchPayload } from "../../utils/getPayloads/elasticSearch";
import commonResource from "../../resources/common.json";
import { Box, Typography } from "@material-ui/core";
import AggregateAndFilterContainer from "../Common/AggregateAndFilterContainer";
import DateTimeFilterParent from "../../components/common/molecules/Filters/DateTimeFilterParent";
import { useParams } from "react-router-dom";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const TopverseTracesContainer = (props) => {
  const { resource } = props;
  const params = useParams();

  const requestId = params.requestId;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    if (requestId) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "AUDIT", "Audit"),
          path: "/yogi-webb/audit",
        },
        {
          title: getResourceValueByKey(resource, "DETAILS", "Details"),
          path: "/yogi-webb/audit/details",
        },
        {
          title: getResourceValueByKey(resource, "TRACES", "Traces"),
          path: `/yogi-webb/audit/details/${requestId}`,
        },
      ]);
    } else {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "INVESTIGATE", "Investigate"),
          path: "/yogi-webb/investigate",
        },
        {
          title: getResourceValueByKey(resource, "TRACES", "Traces"),
          path: "/yogi-webb/investigate/traces",
        },
      ]);
    }
  }, []);

  const columns = [
    {
      field: "timestamp",
      title: getResourceValueByKey(resource, "TIME_STAMP", "Time Stamp"),
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
      field: "userId",
      title: getResourceValueByKey(resource, "USER_ID", "User ID"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      dontTruncate: true,
      sorting: false,
    },
    {
      field: "clientAppId",
      title: getResourceValueByKey(resource, "CLIENT_APP_ID", "Client App ID"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      render: (rowData) => {
        return (
          rowData.clientAppId && (
            <div style={{ minWidth: "100px" }}>{rowData.clientAppId}</div>
          )
        );
      },
      sorting: false,
    },
    {
      field: "userSessionId",
      title: getResourceValueByKey(
        resource,
        "USER_SESSION_ID",
        "User Sess. ID"
      ),
      sorting: false,
      queryString: true,
      copy: true,
    },
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      copy: true,
      sorting: false,
    },
    {
      field: "traceid",
      title: getResourceValueByKey(resource, "REQUEST_ID", "Request ID"),
      defaultFilter: requestId ? requestId : "",
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      copy: true,
      sorting: false,
    },
    {
      field: "parent",
      title: getResourceValueByKey(
        resource,
        "PARENT_SERVICE_ID",
        "Parent Srvc. ID"
      ),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      copy: true,
      sorting: false,
    },
    {
      field: "method",
      title: getResourceValueByKey(resource, "METHOD", "Method"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      dontTruncate: true,
      sorting: false,
    },
    {
      field: "url",
      title: getResourceValueByKey(resource, "URL", "URL"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"log"}
          indexName={"topverse-trace-log"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          {...props}
        />
      ),
      dontTruncate: true,
      sorting: false,
    },
    {
      field: "elapsed",
      title: getResourceValueByKey(resource, "ELAPSED", "Elapsed"),
      sorting: false,
      queryString: true,
    },

    {
      field: "response.msg",
      title: getResourceValueByKey(
        resource,
        "RESPONSE_MESSAGE",
        "Response Message"
      ),
      render: (rowData) => {
        return (
          rowData.response?.msg && (
            <div style={{ minWidth: "300px" }}>
              <Typography variant="caption" style={{ fontWeight: 600 }}>
                {rowData.response.msg}
              </Typography>
            </div>
          )
        );
      },
      sorting: false,
      dontTruncate: true,
      queryString: true,
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
          timestamp: {
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
        "topverse-trace-log",
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
          "TOPVERSE_TRACES",
          "Topverse Traces"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <TopverseTraces
        resource={resource}
        columns={columns}
        handleRemoteData={handleRemoteData}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default TopverseTracesContainer;
