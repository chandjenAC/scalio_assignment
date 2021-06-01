import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { PieChart, Pie, Sector, Tooltip } from "recharts";
import { Cell, ResponsiveContainer, Legend } from "recharts";
import { formatNumber } from "../../../../utils";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";
import CustomTooltip from "./CustomTooltip";

const colors = [
  "#7b26eb",
  "#2a6edb",
  "#0ac5d1",
  "#ff8a33",
  "#34a853",
  "#ff00ff",
];

const graphData = [
  { name: "User A", value: 400, color: "#70B0FA" },
  { name: "User B", value: 300, color: "#3D6BD4" },
  { name: "User C", value: 300, color: "#3D36B2" },
  { name: "User D", value: 200, color: "#00A7BD" },
  { name: "User E", value: 200, color: "#017991" },
];

const overlineTextStyles = {
  stroke: "lightGrey",
  strokeWidth: 0.5,
  fontSize: 12,
  textTransform: "uppercase",
};

const centerTextStyles = {
  stroke: "#000",
  strokeWidth: 0.5,
  fontSize: 22,
  textTransform: "uppercase",
};

const ActiveShapePieChartMolecule = (props) => {
  const {
    resource,
    width,
    height,
    data,
    programTypeData,
    innerRadius,
    paddingAngle,
    legendPosition,
  } = props;
  const [state, setState] = useState({ activeIndex: 0 });

  const style = {
    width: 150,
    padding: 6,
    top: legendPosition?.top || -5,
    left: legendPosition?.left || "70%",
    lineHeight: 1.2,
    maxHeight: 160,
    overflowY: "scroll",
  };

  const tempData = data || graphData;

  const renderLegend = (props) => {
    const { payload } = props;
    return payload.map((entry, index) => {
      const percent = entry.payload.percent * 100;
      return (
        <Grid key={index} container spacing={1} alignItems="flex-start">
          <Grid item>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: entry.color,
                marginTop: 10,
              }}
            ></div>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="left">
              {`${percent.toFixed(2)} %`}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="left">
              {entry.value}
            </Typography>
          </Grid>
        </Grid>
      );
    });
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-33}
          textAnchor="middle"
          style={overlineTextStyles}
        >
          {getResourceValueByKey(resource, "INTEREST", "Interest")}
        </text>
        <text
          x={cx}
          y={cy}
          dy={-18}
          textAnchor="middle"
          style={overlineTextStyles}
        >
          {getResourceValueByKey(resource, "CHARGE", "Charge")}
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle" style={centerTextStyles}>
          {formatNumber(programTypeData.totalFeeYTD.total, 2, 2, "compact")}
        </text>
        <text
          x={cx}
          y={cy}
          dy={40}
          textAnchor="middle"
          style={overlineTextStyles}
        >
          {programTypeData.totalFeeYTD.ccy}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const onPieEnter = (data, index) => {
    setState({
      activeIndex: index,
    });
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={tempData}
          cx={100}
          // cy={90}
          stroke="none"
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius="98%"
          // fill="#8884d8"
          paddingAngle={paddingAngle}
          onMouseEnter={onPieEnter}
        >
          {tempData.map((val, i) => {
            return (
              <Cell
                key={i}
                cursor="pointer"
                fill={colors[i]}
                name={val.name}
                // onClick={() => alert(`${val.name} - ${val.value}`)}
              />
            );
          })}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          content={renderLegend}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ActiveShapePieChartMolecule;
