import React from "react";
import { ComposedChart, Line, Bar, XAxis } from "recharts";
import { YAxis, CartesianGrid, Tooltip } from "recharts";
import { Legend, ResponsiveContainer } from "recharts";
import format from "date-fns/format";
import CustomTooltip from "./CustomTooltip";

const graphData = {
  data: [
    {
      name: "2020-11-25",
      count: 24,
      TMR: 12,
      YOGIWEBB: 12,
      "2Cash": 24,
    },
    {
      name: "2020-11-26",
      count: 14,
      TMR: 10,
      YOGIWEBB: 4,
      "2Cash": 14,
    },
    {
      name: "2020-11-30",
      count: 4,
      YOGIWEBB: 3,
      TMR: 1,
      "2Cash": 4,
    },
    {
      name: "2020-12-01",
      count: 2,
      YOGIWEBB: 2,
      "2Cash": 2,
    },
    {
      name: "2020-11-27",
      count: 1,
      YOGIWEBB: 1,
      "2Cash": 1,
    },
  ],
  bars: {
    apps: ["TMR", "YOGIWEBB"],
    starfleets: ["2Cash"],
  },
};

const colors = [
  ["#3D36B2", "#3D6BD4", "#70B0FA"],
  ["#017991", "#00A7BD", "#7DEBD9"],
];

const ComposedChartMolecule = (props) => {
  const {
    width,
    height,
    margin,
    data,
    ccy,
    isDateOnXaxis,
    isTimeOnXaxis,
  } = props;

  let tempData = data || graphData;

  const formatXAxis = (tickItem) => {
    return isDateOnXaxis
      ? format(new Date(tickItem), "MM/dd/yyyy")
      : isTimeOnXaxis
      ? format(new Date(tickItem), "HH:mm aaaaa'm'")
      : tickItem;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart data={tempData.data} margin={margin}>
        <CartesianGrid strokeWidth={0.5} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#949494" }}
          stroke="#5c5c5c"
          tickLine={false}
          axisLine={true}
          tickFormatter={formatXAxis}
        />
        <YAxis tickLine={false} tick={{ fill: "#949494" }} stroke="#5c5c5c" />
        <Tooltip
          content={
            <CustomTooltip
              ccy={ccy}
              isDateOnXaxis={isDateOnXaxis}
              isTimeOnXaxis={isTimeOnXaxis}
              {...props}
            />
          }
        />
        <Legend wrapperStyle={{ color: "#c2c9d9" }} />
        {Object.keys(tempData.bars).map((key, i) =>
          tempData.bars[key].map((datakey, j) => {
            return (
              <Bar
                dataKey={datakey}
                stackId={key}
                barSize={20}
                fill={colors[i][j]}
              />
            );
          })
        )}

        <Line type="monotone" dataKey="count" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default ComposedChartMolecule;
