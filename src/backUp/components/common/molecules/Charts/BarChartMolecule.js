import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import capitalize from "lodash/capitalize";
import { formatNumber } from "../../../../utils";

// const data = {
//   data: [
//     {
//       name: "Page A",
//       pv: 2400,
//     },
//     {
//       name: "Page B",
//       pv: 1398,
//     },
//     {
//       name: "Page C",
//       pv: 8,
//     },
//     {
//       name: "Page D",
//       pv: 3908,
//     },
//     {
//       name: "Page E",
//       pv: 4800,
//     },
//     {
//       name: "Page F",
//       pv: 3800,
//     },
//     {
//       name: "Page G",
//       pv: 4300,
//     },
//   ],
//   bars: [{ key: "pv", name: "Test 1" }],
// };

const defaultMargin = {
  top: 16,
  right: 30,
  left: 20,
  bottom: 0,
};

const BarChartMolecule = (props) => {
  const {
    width,
    height,
    data,
    barSize,
    margin,
    hideCartesianGrid,
    hideXaxisLine,
    hideYaxis,
    barGradient,
  } = props;

  const CustomTooltip = (props) => {
    return (
      <Paper style={{ padding: 10 }}>
        <Typography variant="subtitle2">{props.label}</Typography>
        {props.payload &&
          props.payload.map((payload, index) => {
            return (
              <Typography
                key={index}
                variant="body2"
                align="left"
                style={{ color: payload.stroke, padding: "3px 0px" }}
              >
                {capitalize(payload.name)}: {formatNumber(payload.value)}
              </Typography>
            );
          })}
      </Paper>
    );
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data.data}
        margin={margin ? margin : defaultMargin}
        barSize={barSize || 40}
      >
        <defs>
          <linearGradient
            id="skyblueGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#98e5eb" stopOpacity={0.8} />
            <stop offset="1" stopColor="#6cd3d9" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient
            id="greyGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#e0e0e0" stopOpacity={0.8} />
            <stop offset="0.5" stopColor="#b5b5b5" stopOpacity={0.8} />
            <stop offset="1" stopColor="#a3a2a2" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        {!hideCartesianGrid && (
          <CartesianGrid strokeWidth={0.5} vertical={false} />
        )}
        <XAxis
          dataKey="name"
          tick={{ fill: "#949494" }}
          stroke="#5c5c5c"
          strokeWidth={0.5}
          tickLine={false}
          axisLine={hideXaxisLine ? false : true}
        />
        <YAxis
          tick={{ fill: "#949494" }}
          stroke="#5c5c5c"
          strokeWidth={0.5}
          hide={hideYaxis}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: "#f5f5f5" }} content={<CustomTooltip />} />
        {data.bars.map((bar, index) => {
          return (
            <Bar
              key={index}
              name={bar.name}
              dataKey={bar.key}
              fill={
                barGradient === "greyGradient"
                  ? "url(#greyGradient)"
                  : "url(#skyblueGradient)"
              }
              minPointSize={0}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(BarChartMolecule);
