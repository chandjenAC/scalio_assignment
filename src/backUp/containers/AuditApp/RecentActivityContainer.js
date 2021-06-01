import React, { useState } from "react";
import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import StyledCard from "../../components/common/molecules/Cards/StyledCard";
import { useQuery } from "react-query";
import { getDataFromES } from "../../utils/getData";
import RecentActivityFilters from "../../components/auditApp/RecentActivityFilters";
// import { formatNumber } from "../../utils";
import MaterialTable from "material-table";
import format from "date-fns/format";
import { getRecentActivityByFilters } from "../../utils/getPayloads/elasticSearch";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import CustomMTablePagination from "../../components/common/molecules/CustomMTablePagination";

const tableStyles = {
  boxShadow: "none",
  padding: "0px 16px 0px 16px",
  margin: "auto",
  width: "95%",
  background: "transparent",
  color: "white",
  zIndex: 80,
};

const headerStyles = {
  // padding: "6px",
  fontWeight: "500",
  color: "#c2c9d9",
  background: "transparent",
  zIndex: 99,
};

const useStyles = makeStyles((theme) => ({
  recentActMainCont: {
    height: "100%",
  },
  title: {
    color: theme.palette.common.white,
  },
  titleCont: {
    margin: "8px 0px 0px 12px",
  },
  titleDividerDiv: {
    width: "120px",
  },
  titleDivider: {
    backgroundColor: theme.palette.grey[300],
  },
  divider: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "90%",
    backgroundColor: theme.palette.common.white,
  },
}));

const RecentActivityContainer = (props) => {
  const { resource } = props;
  const classes = useStyles();

  const [activeFilters, setActiveFilters] = useState({
    userId: "",
    starfleet: "",
    org: "",
    app: "",
    activityType: "",
    status: "",
    dateTime: { gte: "", lte: "" },
  });

  const [tableData, setTableData] = useState([]);

  const columns = [
    // {
    //   field: "starfleetName",
    //   title: getResourceValueByKey(resource, "STARFLEET", "Starfleet"),
    //   width: "100px",
    // },
    {
      field: "userId",
      title: getResourceValueByKey(resource, "USER", "User"),
    },

    {
      field: "clientAppId",
      title: getResourceValueByKey(resource, "CLIENT_APP", "Client App"),
      render: (rowData) => (
        <Typography variant="caption">{rowData.clientAppId}</Typography>
      ),
    },
    {
      field: "activityType",
      title: getResourceValueByKey(resource, "ACTIVITY", "Activity"),
      render: (rowData) => (
        <Typography variant="caption">{rowData.activityType}</Typography>
      ),
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      render: (rowData) => (
        <Typography variant="caption">{rowData.status}</Typography>
      ),
    },
    // {
    //   field: "timetaken",
    //   title: getResourceValueByKey(
    //     resource,
    //     "TIME_TAKEN(MS)",
    //     "Time Taken(ms)"
    //   ),
    //   render: (rowData) => formatNumber(rowData.timetaken),
    // },
    {
      field: "timestamp",
      title: getResourceValueByKey(resource, "DATE", "Date"),
      render: (rowData) => (
        <Typography variant="caption">
          {format(new Date(rowData.timestamp), "MM/dd/yyyy HH:mm a")}
        </Typography>
      ),
    },
  ];

  useQuery(
    [
      "elasticSearch_recentUserLoginActivity",
      getRecentActivityByFilters({
        activityType: activeFilters.activityType,
        userId: activeFilters.userId,
        org: activeFilters.org,
        starfleet: activeFilters.starfleet,
        app: activeFilters.app,
        status: activeFilters.status,
        dateTime: activeFilters.dateTime,
        size: 24,
      }),
    ],
    getDataFromES,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let tempData = [];
        data.data.map((item) => {
          tempData.push(item._source);
        });
        setTableData(tempData);
      },
    }
  );

  const handleApplyUserIdFilter = (selectedOption) => {
    setActiveFilters({ ...activeFilters, userId: selectedOption.name });
  };

  const handleClearUserIdFilter = () => {
    setActiveFilters({ ...activeFilters, userId: "" });
  };

  const handleApplyOrgFilter = (selectedOption) => {
    setActiveFilters({ ...activeFilters, org: selectedOption.label });
  };

  const handleClearOrgFilter = () => {
    setActiveFilters({ ...activeFilters, org: "" });
  };

  const handleApplyStarfleetFilter = (selectedOption) => {
    setActiveFilters({ ...activeFilters, starfleet: selectedOption.name });
  };

  const handleClearStarfleetFilter = () => {
    setActiveFilters({ ...activeFilters, starfleet: "" });
  };

  const handleApplyAppFilter = (selectedOption) => {
    setActiveFilters({ ...activeFilters, app: selectedOption.name });
  };

  const handleClearAppFilter = () => {
    setActiveFilters({ ...activeFilters, app: "" });
  };

  const handleApplyActivityTypeFilter = (selectedOption) => {
    setActiveFilters({ ...activeFilters, activityType: selectedOption.name });
  };

  const handleClearActivityTypeFilter = () => {
    setActiveFilters({ ...activeFilters, activityType: "" });
  };

  const handleApplyStatusFilter = (selectedOption) => {
    setActiveFilters({ ...activeFilters, status: selectedOption.name });
  };

  const handleClearStatusFilter = () => {
    setActiveFilters({ ...activeFilters, status: "" });
  };

  const handleApplyDateTimeFilter = (values) => {
    setActiveFilters({
      ...activeFilters,
      dateTime: { gte: values.gte, lte: values.lte },
    });
  };

  const handleClearDateTimeFilter = () => {
    setActiveFilters({ ...activeFilters, dateTime: {} });
  };

  const getTitle = (title) => {
    return (
      <Grid
        container
        alignItems="center"
        spacing={1}
        className={classes.titleCont}
      >
        <Grid item>
          <Typography variant="body2" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item className={classes.titleDividerDiv}>
          <Divider className={classes.titleDivider} variant="fullWidth" />
        </Grid>
      </Grid>
    );
  };

  return (
    <StyledCard>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          {getTitle(getResourceValueByKey(resource, "RECENT", "Recent"))}
        </Grid>
        <Grid item>
          <RecentActivityFilters
            resource={resource}
            activeFilters={activeFilters}
            handleApplyUserIdFilter={handleApplyUserIdFilter}
            handleClearUserIdFilter={handleClearUserIdFilter}
            handleApplyOrgFilter={handleApplyOrgFilter}
            handleClearOrgFilter={handleClearOrgFilter}
            handleApplyAppFilter={handleApplyAppFilter}
            handleClearAppFilter={handleClearAppFilter}
            handleApplyStarfleetFilter={handleApplyStarfleetFilter}
            handleClearStarfleetFilter={handleClearStarfleetFilter}
            handleApplyStatusFilter={handleApplyStatusFilter}
            handleClearStatusFilter={handleClearStatusFilter}
            handleApplyActivityTypeFilter={handleApplyActivityTypeFilter}
            handleClearActivityTypeFilter={handleClearActivityTypeFilter}
            handleApplyDateTimeFilter={handleApplyDateTimeFilter}
            handleClearDateTimeFilter={handleClearDateTimeFilter}
          />
        </Grid>
      </Grid>
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <MaterialTable
          style={tableStyles}
          icons={tableIcons}
          columns={columns}
          data={tableData}
          components={{
            Pagination: (props) => {
              return <CustomMTablePagination {...props} />;
            },
          }}
          options={{
            rowStyle: {
              backgroundColor: "transparent",
              padding: "0px",
            },
            headerStyle: headerStyles,
            padding: "dense",
            toolbar: false,
            search: false,
            sorting: false,
            draggable: false,
            pageSizeOptions: [8, 16, 24],
            pageSize: 8,
            // maxBodyHeight: 325,
          }}
        />
      </div>
    </StyledCard>
  );
};

export default RecentActivityContainer;

// <StyledCard>
// <Grid container className={classes.recentActMainCont}>
//   <Grid item xs={12} sm={6} md={6} lg={6}>
//     <Grid container alignItems="center" justify="space-between">
//       <Grid item>
//         {getTitle(getResourceValueByKey(resource, "RECENT", "Recent"))}
//       </Grid>
//       <Grid item>
//         <RecentActivityFilters
//           resource={resource}
//           activeFilters={activeFilters}
//           starfleetOptions={starfleetOptions}
//           appOptions={appOptions}
//           handleApplyAppFilter={handleApplyAppFilter}
//           handleClearAppFilter={handleClearAppFilter}
//           handleApplyStarfleetFilter={handleApplyStarfleetFilter}
//           handleClearStarfleetFilter={handleClearStarfleetFilter}
//         />
//       </Grid>
//     </Grid>
//     {getRecentActivityContainerBySelectedDashboard()}
//   </Grid>
//   <Divider orientation="vertical" flexItem className={classes.divider} />

//   <Grid item xs={12} sm={6} md={6} lg={6}>
//     {getTitle(
//       getResourceValueByKey(
//         resource,
//         "FAILED_ATTEMPTS",
//         "Failed Attempts"
//       )
//     )}
//     {getRecentActivityContainerBySelectedDashboard()}
//   </Grid>
// </Grid>
// </StyledCard>
