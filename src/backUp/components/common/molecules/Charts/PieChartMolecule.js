import React from "react";
import { PieChart, Pie, ResponsiveContainer, Legend } from "recharts";
import { Tooltip, Cell } from "recharts";
import CustomTooltip from "./CustomTooltip";

//blue shades
const blueShades = [
  "#7b26eb",

  "#4481e3",
  "#12d6e3",

  "#00A7BD",
  "#3D6BD4",

  "#3D36B2",
];

//bright colors
const brightShades = [
  "#4285f4",
  "#ea4335",
  "#fbbc04",
  "#34a853",
  "#ff6d01",
  "#46bdc6",
  "#ff00ff",
  "#7e40d3",
  "#741b47",
  "#cccccc",
];

//greyscale colors
// const colors = [
//   "#72a2f2",
//   "#f0aba5",
//   "#ebd38f",
//   "#659c74",
//   "#72a680",
//   "#72b5ba",
// ];

const graphData = [
  { name: "Starfleet A", value: 400, color: "#70B0FA" },
  { name: "Starfleet B", value: 300, color: "#3D6BD4" },
  { name: "Starfleet C", value: 300, color: "#3D36B2" },
];


const PieChartMolecule = (props) => {
  const {
    width,
    height,
    data,
    innerRadius,
    outerRadius,
    blueGradient,
    hideLabel,
    legendPosition,
    paddingAngle,
    onClick,
  } = props;

  const style = {
    width: 250,
    top: legendPosition?.top || -5,
    left: legendPosition?.left || "80%",
    lineHeight: "24px",
    color: "#c2c9d9",
  };

  const tempData = data || graphData;
  const colors = blueGradient ? blueShades : brightShades;

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: width, height: height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={tempData}
            // isAnimationActive={false}
            dataKey="value"
            innerRadius={innerRadius}
            outerRadius={outerRadius || "80%"}
            stroke="none"
            paddingAngle={paddingAngle}
            onClick={onClick}
            style={{ cursor: "pointer" }}
            label={!hideLabel && renderCustomizedLabel}
            labelLine={false}
            isAnimationActive={false}
          >
            {tempData.map((val, i) => {
              return (
                <Cell
                  key={i}
                  //   cursor="pointer"
                  fill={colors[i]}
                  // name={val.name}
                  //   onClick={() => alert(`${val.name} - ${val.value}`)}
                />
              );
            })}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconSize={10}
            // width={70}
            // height={70}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PieChartMolecule;
