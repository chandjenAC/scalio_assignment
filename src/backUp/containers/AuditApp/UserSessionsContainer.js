import React, { useContext, useEffect } from "react";
import UserSessions from "../../components/auditApp/UserSessions";
import commonResource from "../../resources/common.json";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { MenuItem, Select } from "@material-ui/core";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { getSessionsListBody } from "../../utils/getPayloads/authn";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import DateTimeFilterParent from "../../components/common/molecules/Filters/DateTimeFilterParent";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const UserSessionsContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "AUDIT", "Audit"),
        path: "/yogi-webb/audit",
      },
      {
        title: getResourceValueByKey(resource, "SESSIONS", "Sessions"),
        path: "/yogi-webb/audit/user-sessions",
      },
    ]);
  }, []);
  const statusOptions = [
    {
      key: getResourceValueByKey(resource, "ACTIVE", "Active"),
      value: "Active",
    },
    {
      key: getResourceValueByKey(resource, "EXPIRED", "Expired"),
      value: "Expired",
    },
    {
      key: getResourceValueByKey(resource, "CLOSED", "Closed"),
      value: "Closed",
    },
  ];

  const columns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "SESSION_ID", "Session ID"),
      sorting: false,
      copy: true,
    },
    {
      field: "userId",
      title: getResourceValueByKey(resource, "USER_ID", "User ID"),
      sorting: false,
    },
    {
      field: "orgId",
      title: getResourceValueByKey(resource, "ORG_ID", "Org. ID"),
      sorting: false,
      copy: true,
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      sorting: false,
      filterComponent: (props) => (
        <Select
          style={{ minWidth: 150 }}
          value={props.columnDef.tableData.filterValue || ""}
          margin="dense"
          onChange={(e) =>
            props.onFilterChanged(props.columnDef.tableData.id, e.target.value)
          }
        >
          <MenuItem value="">
            <em>{getResourceValueByKey(resource, "NONE", "None")}</em>
          </MenuItem>
          {statusOptions.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "createdOn",
      title: getResourceValueByKey(resource, "STARTED_ON", "Started On"),
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
      field: "closedOn",
      title: getResourceValueByKey(resource, "ENDED_ON", "Ended On"),
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
  ];

  const updateDateTimeFilter = (fromDate, toDate, props) => {
    const value = { ...props.columnDef.tableData.filterValue };
    value.gte = toDate !== "" ? toDate : null;
    value.lte = fromDate !== "" ? fromDate : null;
    props.onFilterChanged(props.columnDef.tableData.id, value);
  };

  const handleRemoteData = (query) => {
    return new Promise((resolve, reject) => {
      let sort = [
        {
          fieldName: "createdOn",
          sortOrder: "DESC",
        },
      ];
      let filters = [];
      if (query.filters.length > 0) {
        query.filters.map((filter) => {
          if (filter.column.rangeFilter) {
            let gte = filter.value.gte ? filter.value.gte : "";
            let lte = filter.value.lte ? filter.value.lte : "";
            if (!(gte === "" && lte === "")) {
              filters.push({
                fieldName: filter.column.field,
                operator: "range",
                values: [gte, lte],
              });
            }
          } else {
            filters.push({
              fieldName: filter.column.field,
              operator: "like",
              values: [filter.value],
            });
          }
        });
      }
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let criteria = getFilterSortPaginate(filters, sort, paging);
      let body = getSessionsListBody(criteria);
      post(env.AUTHN_SESSIONS_LIST, body).then((result) => {
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
        title={getResourceValueByKey(resource, "SESSIONS", "Sessions")}
      />
    );
  };

  const getMainSection = () => {
    return (
      <UserSessions
        resource={resource}
        columns={columns}
        handleRemoteData={handleRemoteData}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default UserSessionsContainer;
