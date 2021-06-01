import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import TrendWithFilter from "../../components/auditApp/TrendWithFilter";
import LineChartMolecule from "../../components/common/molecules/Charts/LineChartMolecule";
import PieChartMolecule from "../../components/common/molecules/Charts/PieChartMolecule";
import CardWithTitle from "../../components/common/organisms/CardWithTitle";
import { getLineGraphDataFromResponse } from "../../utils";
import { findIfDateOnXaxis, findIfTimeOnXaxis } from "../../utils";
import { getFilterLabelByValue } from "../../utils";
import { getPieChartDataFromResponse } from "../../utils";
import { getDataFromES } from "../../utils/getData";
import { getAggTopHitsByField } from "../../utils/getPayloads/elasticSearch";
import { getTopHitsByField } from "../../utils/getPayloads/elasticSearch";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const UsersByActivityContainer = (props) => {
  const { resource, filterOptions, getTrendsSeperatorText } = props;
  const navigate = useNavigate();

  const kpisInitialState = {
    isLoading: true,
    displayName: getResourceValueByKey(
      resource,
      "TOP_USERS_BY_ACTIVITY",
      "Top Users by Activity"
    ),
    data: [],
  };

  const trendsInitialState = {
    isLoading: true,
    filters: { gte: "now-1w/w" },
    displayName: getResourceValueByKey(resource, "TOP_5_USERS", "Top 5 Users"),
  };

  const [kpis, setKpis] = useState(kpisInitialState);
  const [trends, setTrends] = useState(trendsInitialState);

  useQuery(
    [
      "elasticSearch_top5UsersByActivity",
      getTopHitsByField({
        serverName: "txn",
        indexName: "user-audit-log-*",
        field: "userId.keyword",
        size: 5,
      }),
    ],
    getDataFromES,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let graphData = getPieChartDataFromResponse(
          data?.data?.top_hits?.buckets || []
        );
        setKpis((prevState) => ({
          ...prevState,
          isLoading: false,
          data: graphData,
        }));
      },
    }
  );

  useQuery(
    [
      "elasticSearch_topUsersByActivityTrend",
      getAggTopHitsByField({
        serverName: "txn",
        indexName: "user-audit-log-*",
        field: "userId.keyword",
        gte: trends.filters.gte,
        size: 5,
      }),
    ],
    getDataFromES,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let graphData = getLineGraphDataFromResponse(data);
        setTrends((prevState) => ({
          ...prevState,
          isLoading: false,
          data: graphData,
        }));
      },
    }
  );

  const handleApplyTopUsersFilter = (value) => {
    setTrends((prevState) => ({
      ...prevState,
      filters: { gte: value },
    }));
  };

  const handleClearTopUsersFilter = (value) => {
    setTrends((prevState) => ({
      ...prevState,
      filters: { gte: "now-1w/w" },
    }));
  };

  const handleClickLineChart = (e) => {
    const filters = { userId: e.dataKey, timestamp: e.payload.name };
    navigate("details", { state: filters });
  };

  const handleClickPieChart = (e) => {
    const filters = { userId: e.name };
    navigate("details", { state: filters });
  };

  return (
    <CardWithTitle
      cardTitle={kpis.displayName}
      isLoading={kpis.isLoading}
      padding={"25px 0px 0px 0px"}
    >
      <PieChartMolecule
        width={"60%"}
        innerRadius={"60%"}
        height={120}
        data={kpis.data}
        paddingAngle={5}
        onClick={handleClickPieChart}
      />
      {getTrendsSeperatorText()}
      <TrendWithFilter
        resource={resource}
        popoverTitle={getResourceValueByKey(
          resource,
          "FILTER_BY_PERIOD",
          "Filter by Period"
        )}
        filterValue={getFilterLabelByValue(filterOptions, trends.filters.gte)}
        defaultValue={trends.filters.gte}
        selectLabel={getResourceValueByKey(resource, "PERIOD", "Period")}
        filterOptions={filterOptions}
        handleApplyFilter={handleApplyTopUsersFilter}
        clearFilter={handleClearTopUsersFilter}
      >
        <LineChartMolecule
          data={trends.data}
          width={"100%"}
          height={170}
          isDateOnXaxis={findIfDateOnXaxis(trends.filters.gte)}
          isTimeOnXaxis={findIfTimeOnXaxis(trends.filters.gte)}
          margin={{ top: 30, right: 40, left: 0, bottom: 0 }}
          onClick={handleClickLineChart}
        />
      </TrendWithFilter>
    </CardWithTitle>
  );
};

export default UsersByActivityContainer;
