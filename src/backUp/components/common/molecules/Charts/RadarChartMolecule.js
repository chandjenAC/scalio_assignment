import React from "react";
import { Radar, RadarChart, PolarGrid } from "recharts";
import { PolarAngleAxis, Tooltip, ResponsiveContainer } from "recharts";

const graphData = [
  { name: "Jan 21 2020", value: 120 },
  { name: "Sept 1 2020", value: 98 },
  { name: "Oct 18 2020", value: 199 },
  { name: "Feb 7 2020", value: 85 },
  { name: "Mar 24 2020", value: 65 },
];

const RadarChartMolecule = (props) => {
  const { width, height, data } = props;

  const tempData = data || graphData;
  return (
    <div style={{ width: width, height: height }}>
      <ResponsiveContainer>
        <RadarChart
          //   cx={300}
          //   cy={250}
          outerRadius={"75%"}
          //   width={400}
          //   height={220}
          data={tempData}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            stroke="#ffffff"
          />
          <Radar
            name="Count"
            dataKey="value"
            stroke="#3D6BD4"
            fill="#3D6BD4"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default RadarChartMolecule;
