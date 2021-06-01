import React from "react";
import { LineChart, Line } from "recharts";
import { XAxis, YAxis, Tooltip } from "recharts";
import { Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { rechartColors } from "../../../../utils/constants";
import { customTickFormatter, formatXAxis, shuffle } from "../../../../utils";
import CustomTooltip from "./CustomTooltip";

// const sampleGraphData = {
//   data: [
//     {
//       name: "Jan 1",
//       starfleet1: 4000,
//       starfleet2: 2400,
//       starfleet3: 2400,
//     },
//     {
//       name: "Jan 2",
//       starfleet1: 3000,
//       starfleet2: 1398,
//       starfleet3: 2210,
//     },
//     {
//       name: "Jan 3",
//       starfleet1: 2000,
//       starfleet2: 9800,
//       starfleet3: 2290,
//     },
//     {
//       name: "Jan 4",
//       starfleet1: 2780,
//       starfleet2: 3908,
//       starfleet3: 2000,
//     },
//     {
//       name: "Jan 5",
//       starfleet1: 1890,
//       starfleet2: 4800,
//       starfleet3: 2181,
//     },
//     {
//       name: "Jan 6",
//       starfleet1: 2390,
//       starfleet2: 3800,
//       starfleet3: 2500,
//     },
//     {
//       name: "Jan 7",
//       starfleet1: 3490,
//       starfleet2: 4300,
//       starfleet3: 2100,
//     },
//   ],
//   lines: [
//     { key: "starfleet1", name: "Starfleet 1" },
//     { key: "starfleet2", name: "Starfleet 2" },
//     { key: "starfleet3", name: "Starfleet 3" },
//   ],
// };

const LineChartMolecule = (props) => {
  const {
    data,
    width,
    height,
    ccy,
    margin,
    isDateOnXaxis,
    isTimeOnXaxis,
    onClick,
  } = props;

  let colors = shuffle(rechartColors);
  let twoLineColors = ["#4489fc", "#a95dfc"];

  const getColor = (line, index) => {
    return line.color
      ? line.color
      : twoLineColors[index]
      ? twoLineColors[index]
      : colors[index];
  };

  // data.data.map((item) => {
  //   data.lines.map((line) => {
  //     item[line.key] = Math.round(item[line.key]);
  //   });
  // });

  return (
    data?.data && (
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={data.data}
          margin={margin ? margin : { top: 5, right: 30, left: 5, bottom: 5 }}
          // onClick={(e) => console.log("onClick Line ActiveDot: ", e)}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: "#949494" }}
            stroke="#5c5c5c"
            strokeWidth={0.5}
            tickLine={false}
            axisLine={true}
            tickFormatter={(tickItem) =>
              formatXAxis(tickItem, isDateOnXaxis, isTimeOnXaxis)
            }
            // interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#949494" }}
            stroke="#5c5c5c"
            strokeWidth={0.5}
            tickLine={false}
            tickFormatter={(y) => customTickFormatter(y, ccy)}
          />
          <CartesianGrid strokeWidth={0.5} />
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
          {data.lines.map((line, index) => {
            return (
              <Line
                key={index}
                // type="monotone"
                style={{ cursor: "pointer" }}
                name={line.name}
                dataKey={line.key}
                unit={ccy}
                stroke={getColor(line, index)}
                strokeDasharray={line.dashedLine ? "5 5" : null}
                dot={{
                  fill: getColor(line, index),
                  onClick: onClick,
                }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    )
  );
};

export default React.memo(LineChartMolecule);
