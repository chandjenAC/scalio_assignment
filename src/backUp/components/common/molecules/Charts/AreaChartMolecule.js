import React from "react";
import { AreaChart, Area } from "recharts";
import { XAxis, YAxis, Tooltip } from "recharts";
import { Legend, ResponsiveContainer } from "recharts";
import { customTickFormatter } from "../../../../utils";
import CustomTooltip from "./CustomTooltip";

const AreaChartMolecule = (props) => {
  const { data, width, height, ccy } = props;

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        data={data.data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tick={{ fill: "#949494" }}
          stroke="lightgrey"
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#949494" }}
          stroke="lightgrey"
          tickLine={false}
          tickFormatter={(y) => customTickFormatter(y, ccy)}
        />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip content={<CustomTooltip ccy={ccy} {...props} />} />
        <Legend wrapperStyle={{ color: "#c2c9d9" }} />
        {data.lines.map((line, index) => {
          return (
            <Area
              key={index}
              //   type="monotone"
              name={line.name}
              dataKey={line.key}
              unit={ccy}
              strokeDasharray={line.dashedLine ? "5 5" : null}
              fill="url(#colorUv)"
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default React.memo(AreaChartMolecule);
