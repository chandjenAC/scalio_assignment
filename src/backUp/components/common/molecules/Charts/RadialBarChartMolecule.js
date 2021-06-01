import { Grid } from "@material-ui/core";
import React from "react";
import { RadialBarChart, Legend, RadialBar } from "recharts";
import { ResponsiveContainer } from "recharts";
import { formatAmountByCcy } from "../../../../utils";
import { radialBarChartColors } from "../../../../utils/constants";
// import { shuffle } from "../../../utils";

const style = {
  width: 220,
  top: 10,
  left: "75%",
  lineHeight: "24px",
  color: "#c2c9d9",
};

const RadialBarChartMolecule = (props) => {
  const { width, height, data, ccy, detailsOnLegend } = props;

  // let colors = shuffle(radialBarChartColors);
  data &&
    data.map((item, index) => {
      item.fill = radialBarChartColors[index];
    });

  // const renderLabel = (props) => {
  //   let renderedBar = data.filter((d) => d.value === props.value);
  //   let unit = renderedBar[0].unit;
  //   let rounded = Number(props.value).toFixed(2);
  //   let formattedLabel = ["USD", "INR", "GBP"].includes(unit)
  //     ? formatAmountByCcy(rounded, ccy, 2, 2)
  //     : `${rounded}${unit}`;
  //   return formattedLabel;
  // };

  const getLegendSquareIconStyle = (color) => {
    return {
      width: 10,
      height: 7,
      background: color,
      display: "inline-block",
      marginRight: 6,
    };
  };

  const renderLegend = (props) => {
    const { payload } = props;
    payload.reverse();
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        {payload.map((entry, index) => (
          <Grid item key={`item-${index}`}>
            <div style={getLegendSquareIconStyle(entry.color)}></div>
            {`${entry.value} ${
              detailsOnLegend && entry.payload.unitInCcy
                ? `(${formatAmountByCcy({
                    amount: Number(entry.payload.value).toFixed(2) || 0,
                    ccy: ccy,
                    minFractionDigits: 2,
                    maxFractionDigits: 2,
                  })}, ${entry.payload.details.value}${
                    entry.payload.details.unit
                  })`
                : detailsOnLegend
                ? `(${entry.payload.value}${entry.payload.unit},${entry.payload.details.value}${entry.payload.details.unit})`
                : entry.payload.unitInCcy
                ? `(${formatAmountByCcy({
                    amount: Number(entry.payload.value).toFixed(2) || 0,
                    ccy: ccy,
                    minFractionDigits: 2,
                    maxFractionDigits: 2,
                  })})`
                : `(${entry.payload.value}${entry.payload.unit})`
            }`}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <RadialBarChart
        innerRadius="45%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
        barSize={10}
      >
        <RadialBar
          // label={{ position: "outside", fill: "#000" }}
          background={{ fill: "#606060" }}
          clockWise={true}
          dataKey={"value"}
          minPointSize={5}
          isAnimationActive={false}
        >
          {/* <LabelList content={renderLabel} position="outside" fill="#fff" /> */}
        </RadialBar>
        <Legend
          iconSize={10}
          // width={70}
          // height={70}
          content={renderLegend}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(RadialBarChartMolecule);
