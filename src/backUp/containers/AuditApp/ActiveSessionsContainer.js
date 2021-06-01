import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useQuery } from "react-query";
import PieChartMolecule from "../../components/common/molecules/Charts/PieChartMolecule";
import CardWithTitle from "../../components/common/organisms/CardWithTitle";
import { getDMSexecuteData, getSessionsData } from "../../utils/getData";
import { getSessionsListBody } from "../../utils/getPayloads/authn";
import { getDMSexecutePayload } from "../../utils/getPayloads/dms";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const ActiveSessionsContainer = (props) => {
  const { resource } = props;

  const kpisInitialState = {
    currentUserActiveSessionsCount: {
      isLoading: true,
      displayName: getResourceValueByKey(
        resource,
        "ACTIVE_CURRENT_USERS",
        "Active Current Users"
      ),
      data: [],
    },
    sysUserActiveSessionsCount: {
      isLoading: true,
      displayName: getResourceValueByKey(
        resource,
        "ACTIVE_SYSTEM_USERS",
        "Active System Users"
      ),
      data: [],
    },
    authTypeVsUsers: {
      isLoading: true,
      displayName: getResourceValueByKey(
        resource,
        "ACTIVE_SESSIONS",
        "Active Sessions"
      ),
      data: [],
    },
  };

  const [kpis, setKpis] = useState(kpisInitialState);

  useQuery(
    [
      "authn_currentUserActiveSessions",
      getSessionsListBody({
        filters: [
          {
            fieldName: "status",
            operator: "eq",
            values: ["Active"],
          },
          {
            fieldName: "sessionDetails.authprovider",
            operator: "eq",
            values: ["auth0"],
          },
        ],
        sort: [
          {
            fieldName: "createdOn",
            sortOrder: "DESC",
          },
        ],
        paging: {
          pageSize: 10,
          currentPage: 1,
        },
      }),
    ],
    getSessionsData,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setKpis((prevState) => ({
          ...prevState,
          currentUserActiveSessionsCount: {
            ...prevState.currentUserActiveSessionsCount,
            isLoading: false,
            data: data?.recordCount,
          },
        }));
      },
    }
  );

  useQuery(
    [
      "authn_systemUserActiveSessions",
      getSessionsListBody({
        filters: [
          {
            fieldName: "status",
            operator: "eq",
            values: ["Active"],
          },
          {
            fieldName: "sessionDetails.authprovider",
            operator: "eq",
            values: ["cognito"],
          },
        ],
        sort: [
          {
            fieldName: "createdOn",
            sortOrder: "DESC",
          },
        ],
        paging: {
          pageSize: 10,
          currentPage: 1,
        },
      }),
    ],
    getSessionsData,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setKpis((prevState) => ({
          ...prevState,
          sysUserActiveSessionsCount: {
            ...prevState.sysUserActiveSessionsCount,
            isLoading: false,
            data: data?.recordCount,
          },
        }));
      },
    }
  );

  useQuery(
    [
      "dmsSearch_authTypeVsUsers",
      getDMSexecutePayload(
        "MATCH (n:TopUser) return distinct n.authNProvider,count(n)"
      ),
    ],
    getDMSexecuteData,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let temp = [];
        data.data.map((item) => {
          temp.push({ name: item["n.authNProvider"], value: item["count(n)"] });
        });
        setKpis((prevState) => ({
          ...prevState,
          authTypeVsUsers: {
            ...prevState.authTypeVsUsers,
            isLoading: false,
            data: temp,
          },
        }));
      },
    }
  );

  return (
    <CardWithTitle
      cardTitle={kpis.authTypeVsUsers.displayName}
      isLoading={kpis.authTypeVsUsers.isLoading}
    >
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: 10 }}
      >
        <Grid item>
          <Typography variant="body2" style={{ color: "#fff" }}>
            {getResourceValueByKey(
              resource,
              "ACTIVE_CURRENT_USER_SESSIONS:",
              "Active Current User Sessions:"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" style={{ color: "#fff" }}>
            &nbsp;&nbsp; {kpis.currentUserActiveSessionsCount.data}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginBottom: 12 }}
      >
        <Grid item>
          <Typography variant="body2" style={{ color: "#fff" }}>
            {getResourceValueByKey(
              resource,
              "ACTIVE_SYSTEM_USER_SESSIONS:",
              "Active System User Sessions:"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" style={{ color: "#fff" }}>
            &nbsp;&nbsp; {kpis.sysUserActiveSessionsCount.data}
          </Typography>
        </Grid>
      </Grid>
      <PieChartMolecule
        width={"70%"}
        innerRadius={"0%"}
        legendPosition={{ top: 65, left: "85%" }}
        height={190}
        data={kpis.authTypeVsUsers.data}
        paddingAngle={5}
      />
    </CardWithTitle>
  );
};

export default ActiveSessionsContainer;
