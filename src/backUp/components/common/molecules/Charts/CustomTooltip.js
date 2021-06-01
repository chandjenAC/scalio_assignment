import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { formatAmountByCcy, formatNumber } from "../../../../utils";
import format from "date-fns/format";
import { parseISO } from "date-fns";

const CustomTooltip = (props) => {
  const { isDateOnXaxis, isTimeOnXaxis } = props;

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
              style={{
                color: payload.color,
                padding: "3px 0px",
              }}
            >
              {payload.name}:{" "}
              {props.ccy
                ? formatAmountByCcy({
                    amount: payload.value || 0,
                    ccy: props.ccy,
                    minFractionDigits: 2,
                    maxFractionDigits: 2,
                  })
                : formatNumber(payload.value)}
            </Typography>
          );
        })}
    </Paper>
  );
};

export default CustomTooltip;
