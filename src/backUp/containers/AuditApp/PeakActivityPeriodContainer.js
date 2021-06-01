import React, { useState } from "react";
import { useQuery } from "react-query";
import TrendWithFilter from "../../components/auditApp/TrendWithFilter";
import ComposedChartMolecule from "../../components/common/molecules/Charts/ComposedChartMolecule";
import RadarChartMolecule from "../../components/common/molecules/Charts/RadarChartMolecule";
import CardWithTitle from "../../components/common/organisms/CardWithTitle";
import { getComposedGraphDataFromResponse } from "../../utils";
import { findIfDateOnXaxis, findIfTimeOnXaxis } from "../../utils";
import { getFilterLabelByValue } from "../../utils";
import { getDataFromES } from "../../utils/getData";
import { getAggTopDates } from "../../utils/getPayloads/elasticSearch";
import { getTopDates } from "../../utils/getPayloads/elasticSearch";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const PeakActivityPeriodContainer = (props) => {
  const { resource, filterOptions, getTrendsSeperatorText } = props;

  const kpisInitialState = {
    isLoading: true,
    displayName: getResourceValueByKey(
      resource,
      "PEAK_ACTIVITY_PERIOD",
      "Peak Activity Period"
    ),
    data: [],
  };

  const trendsInitialState = {
    isLoading: true,
    displayName: getResourceValueByKey(resource, "TOP_5_DATES", "Top 5 Dates"),
    filters: { gte: "now-1w/w" },
  };

  const [kpis, setKpis] = useState(kpisInitialState);
  const [trends, setTrends] = useState(trendsInitialState);

  useQuery(
    [
      "elasticSearch_topDatesWithPeakActivity",
      getTopDates({
        serverName: "txn",
        indexName: "user-audit-log-*",
        size: 5,
      }),
    ],
    getDataFromES,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let graphData = [];
        data.data.top_hits_by_day.buckets.map((bucket) => {
          graphData.push({
            name: bucket.key_as_string,
            value: bucket.doc_count,
          });
        });
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
      "elasticSearch_topDatesWithPeakActivityTrend",
      getAggTopDates({
        serverName: "txn",
        indexName: "user-audit-log-*",
        gte: trends.filters.gte,
        size: 5,
      }),
    ],
    getDataFromES,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let graphData = getComposedGraphDataFromResponse(data);
        setTrends((prevState) => ({
          ...prevState,
          isLoading: false,
          data: graphData,
        }));
      },
    }
  );

  const handleApplyTopDatesFilter = (value) => {
    setTrends((prevState) => ({
      ...prevState,
      filters: { gte: value },
    }));
  };

  const handleClearTopDatesFilter = (value) => {
    setTrends((prevState) => ({
      ...prevState,
      filters: { gte: "now-1w/w" },
    }));
  };

  return (
    <CardWithTitle cardTitle={kpis.displayName} isLoading={kpis.isLoading}>
      <RadarChartMolecule width={"100%"} height={120} data={kpis.data} />
      {getTrendsSeperatorText()}
      <TrendWithFilter
        resource={resource}
        popoverTitle={getResourceValueByKey(
          resource,
          "FILTER_BY_PERIOD",
          "Filter by Period"
        )}
        selectLabel={getResourceValueByKey(resource, "PERIOD", "Period")}
        filterValue={getFilterLabelByValue(filterOptions, trends.filters.gte)}
        defaultValue={trends.filters.gte}
        filterOptions={filterOptions}
        handleApplyFilter={handleApplyTopDatesFilter}
        clearFilter={handleClearTopDatesFilter}
      >
        <ComposedChartMolecule
          data={trends.data}
          width={"100%"}
          height={170}
          isDateOnXaxis={findIfDateOnXaxis(trends.filters.gte)}
          isTimeOnXaxis={findIfTimeOnXaxis(trends.filters.gte)}
          margin={{ top: 30, right: 40, left: 0, bottom: 0 }}
        />
      </TrendWithFilter>
    </CardWithTitle>
  );
};

export default PeakActivityPeriodContainer;
