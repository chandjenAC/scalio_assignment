import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ResponsiveContainer, CartesianGrid } from "recharts";
import capitalize from "lodash/capitalize";
import { formatXAxis } from "../../../../utils";
import { format, parseISO } from "date-fns";

const DifferenceBarChart = (props) => {
  const { data, width, height, isDateOnXaxis, isTimeOnXaxis } = props;

  const customeTickFormatter = (num) => {
    return `${num}${data.unit}`;
  };

  const CustomTooltip = (props) => {
    return (
      <Paper style={{ padding: 10 }}>
        <Typography variant="subtitle2">
          {isDateOnXaxis && props.label
            ? format(new Date(parseISO(props.label)), "MM/dd/yyyy")
            : isTimeOnXaxis && props.label
            ? format(new Date(props.label), "HH:mm")
            : props.label}
        </Typography>
        {props.payload &&
          props.payload.map((payload, index) => {
            return (
              <Typography
                key={index}
                variant="body2"
                align="left"
                style={{ color: payload.stroke, padding: "3px 0px" }}
              >
                {capitalize(payload.name)}: {payload.value[0]}
                {payload.unit} ~ {payload.value[1]}
                {payload.unit}
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
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="name"
          tick={{ fill: "#949494" }}
          stroke="#5c5c5c"
          strokeWidth={0.5}
          tickLine={false}
          tickFormatter={(tickItem) =>
            formatXAxis(tickItem, isDateOnXaxis, isTimeOnXaxis)
          }
        />
        <YAxis
          tick={{ fill: "#949494" }}
          stroke="#5c5c5c"
          strokeWidth={0.5}
          tickLine={false}
          tickFormatter={customeTickFormatter}
        />
        <CartesianGrid strokeWidth={0.5} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey={"value"}
          minPointSize={1}
          fill={"#4489fc"}
          unit={data.unit}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(DifferenceBarChart);
