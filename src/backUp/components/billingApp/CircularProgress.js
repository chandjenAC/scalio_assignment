import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const trailStyles = {
  stroke: "#f0f0f0",
  strokeWidth: 5,
  strokeLinecap: "butt",
  transformOrigin: "center center",
};

const CircularProgress = (props) => {
  const {
    width,
    height,
    innerValue,
    outerValue,
    startColorInner,
    endColorInner,
    startColorOuter,
    endColorOuter,
    children,
  } = props;
  const gradientTransform = `rotate(90)`;

  const CustomProgressBar = (props) => {
    const { children, ...otherProps } = props;
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <CircularProgressbarWithChildren
            {...otherProps}
            value={outerValue}
            styles={{
              path: { stroke: `url(#outer)`, height: "100%" },
              trail: trailStyles,
            }}
          >
            <div style={{ width: "84%" }}>
              <CircularProgressbar
                {...otherProps}
                value={innerValue}
                styles={{
                  path: { stroke: `url(#inner)`, height: "100%" },
                  trail: trailStyles,
                }}
              />
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.children}
        </div>
        <svg style={{ height: 0, width: 0 }}>
          <defs>
            <linearGradient id={"inner"} gradientTransform={gradientTransform}>
              <stop offset="0%" stopColor={startColorInner} />
              <stop offset="100%" stopColor={endColorInner} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id={"outer"} gradientTransform={gradientTransform}>
              <stop offset="0%" stopColor={startColorOuter} />
              <stop offset="100%" stopColor={endColorOuter} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <CustomProgressBar percentage={50} strokeWidth="5">
        {children}
      </CustomProgressBar>
    </div>
  );
};

export default CircularProgress;
