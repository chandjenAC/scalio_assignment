import React, { useContext, useEffect } from "react";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getElasticSearchPayload } from "../../utils/getPayloads/elasticSearch";
import AuditLogs from "../../components/auditApp/AuditLogs";
import commonResource from "../../resources/common.json";
import { useParams, useLocation } from "react-router-dom";
import TopverseLogsContainer from "../InvestigateApp/TopverseLogsContainer";
import AggregateAndFilterContainer from "../Common/AggregateAndFilterContainer";
import AsyncPaginatedSelect from "../Common/AsyncPaginatedSelect";
import DateTimeFilterParent from "../../components/common/molecules/Filters/DateTimeFilterParent";
import { Typography } from "@material-ui/core";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { avatarLoadOptions } from "../../utils/loadOptions";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const subTableStyle = {
  padding: "5px 10px",
  marginLeft: 30,
  backgroundColor: "#f4f4f4",
};

const AuditLogsContainer = (props) => {
  const { resource, fromEndPointsApp, fromProcessBotApp } = props;
  const params = useParams();
  const location = useLocation();

  const {
    starfleetId,
    avatarName,
    userId,
    activityType,
    activity,
    timestamp,
    status,
    clientAppId,
  } = location.state || {};

  const endPoint = params.endPoint;
  const avatarId = params.avatarId;
  const queryString = new URLSearchParams(location.search);
  const folderName = queryString.get("folderName");
  const isOutgoing = queryString.get("isOutgoing");

  const docName = params.docName;
  const processInstanceId = params.processInstanceId;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    if (fromEndPointsApp) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
          path: "/yogi-webb/end-points",
        },
        {
          title: getResourceValueByKey(
            resource,
            "FOLDER_CONTENTS",
            "Folder Contents"
          ),
          path: `/yogi-webb/end-points/${encodeURIComponent(
            endPoint
          )}/${avatarId}?folderName=${folderName}&isOutgoing=${isOutgoing}`,
        },
        {
          title: getResourceValueByKey(resource, "LOGS", "Logs"),
          path: "",
        },
      ]);
    } else if (fromProcessBotApp) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "PROCESS-BOT", "Process-Bot"),
          path: "/yogi-webb/process-bot",
        },
        {
          title: getResourceValueByKey(resource, "INSTANCES", "Instances"),
          path: `/yogi-webb/process-bot/${params.processId}/instances`,
        },
        {
          title: getResourceValueByKey(resource, "LOGS", "Logs"),
          path: `/yogi-webb/process-bot/${params.processId}/instances`,
        },
      ]);
    } else {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "AUDIT", "Audit"),
          path: "/yogi-webb/audit",
        },
        {
          title: getResourceValueByKey(resource, "DETAILS", "Details"),
          path: "/yogi-webb/audit/details",
        },
      ]);
    }
  }, []);

  const columns = [
    {
      field: "starfleetId",
      title: getResourceValueByKey(resource, "STARFLEET_ID", "Starfleet ID"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"txn"}
          indexName={"user-audit-log-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          defaultValue={{ name: starfleetId }}
          {...props}
        />
      ),
      defaultFilter: starfleetId,
      sorting: false,
    },
    {
      field: "avatarName",
      title: getResourceValueByKey(resource, "AVATAR_NAME", "Avatar Name"),
      filterComponent: (props) => (
        <AsyncPaginatedSelect
          onMtableFilterChange={props.onFilterChanged}
          columnDef={props.columnDef}
          loadOptions={avatarLoadOptions}
          defaultValue={{ label: avatarName }}
        />
      ),
      sorting: false,
      dontTruncate: true,
      cellStyle: { minWidth: 200 },
      defaultFilter: avatarName,
    },
    {
      field: "userId",
      title: getResourceValueByKey(resource, "USER_ID", "User ID"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"txn"}
          indexName={"user-audit-log-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          defaultValue={{ name: userId }}
          {...props}
        />
      ),
      defaultFilter: userId,
      dontTruncate: true,
      sorting: false,
    },
    {
      field: "activityType",
      title: getResourceValueByKey(resource, "ACTIVITY_TYPE", "Activity Type"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"txn"}
          indexName={"user-audit-log-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          defaultValue={{ name: activityType }}
          {...props}
        />
      ),
      defaultFilter: activityType,
      dontTruncate: true,
      sorting: false,
    },
    {
      field: "activity",
      title: getResourceValueByKey(resource, "ACTIVITY", "Activity"),
      render: (rowData) => {
        return (
          rowData.activity && (
            <div style={{ minWidth: "300px" }}>
              <Typography variant="caption" style={{ fontWeight: 600 }}>
                {rowData.activity}
              </Typography>
            </div>
          )
        );
      },
      defaultFilter: activity,
      sorting: false,
      queryString: true,
      dontTruncate: true,
    },
    {
      field: "timestamp",
      title: getResourceValueByKey(resource, "TIMESTAMP", "Timestamp"),
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
      defaultFilter: timestamp,
      rangeFilter: true,
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"txn"}
          indexName={"user-audit-log-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          defaultValue={{ name: status }}
          {...props}
        />
      ),
      defaultFilter: status,
      sorting: false,
    },
    {
      field: "userSessionId",
      title: getResourceValueByKey(
        resource,
        "USER_SESSION_ID",
        "User Sess. ID"
      ),
      queryString: true,
      sorting: false,
      copy: true,
    },
    {
      field: "clientAppId",
      title: getResourceValueByKey(resource, "SOURCE_APP", "Source App."),
      filterComponent: (props) => (
        <AggregateAndFilterContainer
          serverName={"txn"}
          indexName={"user-audit-log-*"}
          field={props.columnDef.field}
          tableDataId={props.columnDef.tableData.id}
          onMtableFilterChange={props.onFilterChanged}
          defaultValue={{ name: clientAppId }}
          {...props}
        />
      ),
      defaultFilter: clientAppId,
      sorting: false,
    },
    // {
    //   field: "isOnbehalf",
    //   title: getResourceValueByKey(resource, "IS_ONBEHALF", "Is onbehalf"),
    //   type: "boolean",
    //   sorting: false,
    // },
    {
      field: "secondarySessionId",
      title: getResourceValueByKey(resource, "ON_BEHALF_OF", "On Behalf Of"),
      queryString: true,
      sorting: false,
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
          timestamp: {
            order: "desc",
          },
        },
      ];
      if (query.filters.length > 0 && query.filters[0].value) {
        query.filters.map((filter) => {
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
      if (query.search) {
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
        "txn",
        "user-audit-log-*",
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

  const renderSubTable = (rowData) => {
    return (
      <div style={subTableStyle}>
        <TopverseLogsContainer
          padding={"0px 12px"}
          resource={resource}
          traceId={rowData.id}
          pageSize={5}
        />
      </div>
    );
  };

  const getHeader = () => {
    return (
      <AppHeader
        title={
          params.processId
            ? `${params.processId}- ${getResourceValueByKey(
                resource,
                "LOGS",
                "Logs"
              )}`
            : folderName
            ? `${folderName}- ${getResourceValueByKey(
                resource,
                "LOGS",
                "Logs"
              )}`
            : getResourceValueByKey(resource, "LOGS", "Logs")
        }
      />
    );
  };

  const getMainSection = () => {
    return (
      <AuditLogs
        resource={resource}
        columns={columns}
        handleRemoteData={handleRemoteData}
        searchText={processInstanceId}
        renderSubTable={renderSubTable}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default AuditLogsContainer;
