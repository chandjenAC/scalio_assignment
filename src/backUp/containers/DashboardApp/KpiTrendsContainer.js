import React from "react";
import DifferenceBarChart from "../../components/common/molecules/Charts/DifferenceBarChart";
import GuageChartMolecule from "../../components/common/molecules/Charts/GuageChartMolecule";
import RadialBarChartMolecule from "../../components/common/molecules/Charts/RadialBarChartMolecule";
import KpisAndTrendsCarousel from "../../components/dashboardApp/KpisAndTrendsCarousel";
import { Grid, Typography } from "@material-ui/core";
import LineChartMolecule from "../../components/common/molecules/Charts/LineChartMolecule";

const KpiTrendsContainer = (props) => {
  const {
    resource,
    epDashboardData,
    filters,
    kpiTrendsData,
    // handleYogiButtonClick,
  } = props;

  const getRadialBarChartData = (kpi) => {
    let data = [];
    kpi.dataKeys.map((dataKey) => {
      let tempData = epDashboardData[dataKey.key];
      if (tempData) {
        if (dataKey.unitInCcy) {
          tempData.unitInCcy = true;
        }
        data.push(tempData);
      }
    });
    return data;
  };

  const getKpiChart = (kpi) => {
    let type = kpi.type;
    switch (type) {
      case "radialBar":
        return (
          <RadialBarChartMolecule
            key={kpi.id}
            detailsOnLegend={kpi.detailsOnLegend}
            resource={resource}
            data={getRadialBarChartData(kpi)}
            dataKey={kpi.dataKey}
            width={"50%"}
            height={110}
            ccy={filters.currency}
          />
        );
        break;

      case "guage":
        return (
          <Grid
            container
            alignItems="flex-start"
            justify="center"
            key={kpi.id}
            spacing={1}
            style={{ flexWrap: "noWrap", height: 110 }}
          >
            <Grid item>
              <GuageChartMolecule
                resource={resource}
                data={epDashboardData[kpi.dataKey]}
                id={`guage-chart${kpi.id.substring(0, 5)}`}
              />
            </Grid>
            {epDashboardData[kpi.dataKey]?.value && (
              <Grid item style={{ marginTop: 6 }}>
                <Typography
                  variant="h4"
                  style={{ color: "#ffffff" }}
                >{`${Number(epDashboardData[kpi.dataKey]?.value).toFixed(2)}${
                  epDashboardData[kpi.dataKey]?.unit
                }`}</Typography>
                <Typography variant="caption" style={{ color: "#c2c9d9" }}>
                  {epDashboardData[kpi.dataKey]?.name}
                </Typography>
              </Grid>
            )}
          </Grid>
        );
        break;

      default:
        return null;
        break;
    }
  };

  const formatCharData = (data) => {
    let formattedData = [];
    data &&
      data.xAxis.map((item, index) => {
        formattedData.push({ name: item, ...data.yAxis[index] });
      });
    return formattedData;
  };

  const getLineChartData = (trend) => {
    let lineChartData = epDashboardData[trend.dataKey];
    return { lines: trend.lines, data: formatCharData(lineChartData) };
  };

  const getDifferenceBarChartData = (trend) => {
    let barChartData = epDashboardData[trend.dataKey];
    return { unit: trend.unit, data: formatCharData(barChartData) };
  };

  const getTrendChart = (trend, index) => {
    let type = trend.type;
    switch (type) {
      case "lineChart":
        return (
          <LineChartMolecule
            key={index}
            resource={resource}
            width={"95%"}
            height={150}
            data={getLineChartData(trend)}
            ccy={trend.currencyOnYaxis ? filters.currency : ""}
            isDateOnXaxis={filters.period === "Daily"}
          />
        );
        break;

      case "differenceBarChart":
        return (
          <DifferenceBarChart
            key={index}
            data={getDifferenceBarChartData(trend)}
            width={"95%"}
            height={150}
            isDateOnXaxis={filters.period === "Daily"}
          />
        );
        break;

      default:
        return null;
        break;
    }
  };

  return (
    <>
      {/* This is where we can provide a title for whole ideas grouped if necessary from kpiTrendsData.displayName*/}
      <KpisAndTrendsCarousel
        resource={resource}
        ideas={kpiTrendsData.ideas}
        // handleYogiButtonClick={handleYogiButtonClick}
        getKpiChart={getKpiChart}
        getTrendChart={getTrendChart}
      />
    </>
  );
};

export default KpiTrendsContainer;
