import { Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import InfoGraphs from "../../components/dashboardApp/InfoGraphs";
import WorldMap from "./WorldMap";
import ReactTooltip from "react-tooltip";
import { formatAmountByCcy } from "../../utils";
import isEmpty from "lodash/isEmpty";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Avatar from "../../components/common/Avatar";
import PieChartMolecule from "../../components/common/molecules/Charts/PieChartMolecule";

const InfoGraphsContainer = (props) => {
  const { resource, epDashboardData, infographsData, ccy } = props;
  const defaultIdea = infographsData.defaultFilter.idea;
  const defaultRecommmendation = infographsData.defaultFilter.recommendation;

  const [infographFilters, setInfographFilters] = useState({
    idea: defaultIdea,
    recommendation: defaultRecommmendation,
  });
  const [tableData, setTableData] = useState({});
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    let tableData = getTableData({
      idea: defaultIdea,
      recommendation: defaultRecommmendation,
    });
    setTableData(tableData);
  }, [epDashboardData]);

  const getTableData = ({ idea, recommendation }) => {
    let fields = [];
    let selectedIdea = infographsData.ideas.find((i) => i.ideaName === idea);
    let selectedRecommendation = selectedIdea.recommendations.find(
      (r) => r.name === recommendation
    );
    let columns = selectedRecommendation.tableData.columns;
    columns.map((column) => {
      fields.push(column.field);
      if (column.formatByCurrency) {
        column.render = (rowData) => {
          return formatAmountByCcy({
            amount: rowData[column.field] || 0,
            ccy: ccy,
            minFractionDigits: 2,
            maxFractionDigits: 2,
          });
        };
      }
      if (column.renderAvatarComp) {
        column.render = (rowData) => (
          <Avatar
            size="small"
            avatar={{
              labels: [getResourceValueByKey(resource, "SUPPLIER", "Supplier")],
              avatarId: rowData.supplierTopId,
            }}
          />
        );
      }
    });
    let tableData = epDashboardData[selectedRecommendation.tableData.dataKey];
    let tableDataWithSkippedEntries;
    if (tableData) {
      tableDataWithSkippedEntries = tableData.filter((x) => !x.skipTableEnrty);
    }

    return {
      columns: columns,
      tableData: tableDataWithSkippedEntries,
      pieChartData: tableData,
      fields: fields,
    };
  };

  const getFilterOptions = () => {
    let ideaOptions = [];
    let recommendationOptions = [];
    infographsData.ideas.map((idea, index) => {
      ideaOptions.push({ label: idea.ideaName, value: idea.ideaName });
      if (index === 0) {
        idea.recommendations.map((recommendation) => {
          recommendationOptions.push({
            label: recommendation.name,
            value: recommendation.name,
          });
        });
      }
    });
    return {
      ideaOptions: ideaOptions,
      recommendationOptions: recommendationOptions,
    };
  };

  const filterOptions = useMemo(() => getFilterOptions(), [infographsData]);

  const handleChangeIdea = (selectedValue) => {
    setInfographFilters({ ...infographFilters, idea: selectedValue });
    let tableData = getTableData({
      idea: selectedValue,
      recommendation: infographFilters.recommendation,
    });
    setTableData(tableData);
  };

  const handleClearIdea = () => {
    setInfographFilters({ ...infographFilters, idea: defaultIdea });
    let tableData = getTableData({
      idea: defaultIdea,
      recommendation: infographFilters.recommendation,
    });
    setTableData(tableData);
  };

  const handleChangeRecommendation = (selectedValue) => {
    setInfographFilters({ ...infographFilters, recommendation: selectedValue });
    let tableData = getTableData({
      idea: infographFilters.idea,
      recommendation: selectedValue,
    });
    setTableData(tableData);
  };

  const handleClearRecommendation = () => {
    setInfographFilters({
      ...infographFilters,
      recommendation: defaultRecommmendation,
    });
    let tableData = getTableData({
      idea: infographFilters.idea,
      recommendation: defaultRecommmendation,
    });
    setTableData(tableData);
  };

  const getPieChartData = () => {
    let chartData = [];
    if (tableData.pieChartData) {
      tableData.pieChartData.map((item) => {
        chartData.push({
          name: item.supplierName,
          value: item[tableData.fields[1]],
        });
      });
    }
    return chartData;
  };

  const renderMetrics = () => {
    let chartData = getPieChartData();
    return (
      <PieChartMolecule
        data={chartData}
        width={"60%"}
        innerRadius={"0%"}
        legendPosition={{ top: 30, left: "95%" }}
        height={320}
        paddingAngle={2}
      />
    );
  };

  const renderMap = () => {
    let fieldValues = [];
    let selectedColumn = tableData.columns.filter(
      (column) => column.width === "35%"
    );
    let selectedField = selectedColumn[0].field;
    tableData &&
      tableData.tableData.map((item) => {
        fieldValues.push(item[selectedField]);
      });
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Grid item style={{ width: "100%" }}>
          <WorldMap
            setTooltipContent={setTooltipContent}
            tableData={tableData}
            fieldValues={fieldValues}
            selectedField={selectedField}
          />
          <ReactTooltip>{tooltipContent}</ReactTooltip>
        </Grid>
      </Grid>
    );
  };

  const getViewPanelContent = () => {
    if (
      ["Top 10 Suppliers", "Favourite Suppliers"].includes(
        infographFilters.idea
      )
    ) {
      return renderMetrics;
    } else {
      return renderMap;
    }
  };

  const viewPanelContent = useMemo(() => getViewPanelContent(), [
    infographFilters,
    tableData,
    tooltipContent,
  ]);

  return (
    !isEmpty(tableData) && (
      <InfoGraphs
        resource={resource}
        infographFilters={infographFilters}
        ideaOptions={filterOptions.ideaOptions}
        recommendationOptions={filterOptions.recommendationOptions}
        handleChangeIdea={handleChangeIdea}
        handleChangeRecommendation={handleChangeRecommendation}
        handleClearIdea={handleClearIdea}
        handleClearRecommendation={handleClearRecommendation}
        tableData={tableData}
        viewPanelContent={viewPanelContent}
      />
    )
  );
};

export default InfoGraphsContainer;
