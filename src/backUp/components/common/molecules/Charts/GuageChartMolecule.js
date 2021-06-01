import React from "react";
import GaugeChart from "react-gauge-chart";

const GuageChartMolecule = (props) => {
  const { id, data } = props;

  return (
    <div style={{ position: "relative" }}>
      <GaugeChart
        id={id}
        style={{ width: "150px" }}
        nrOfLevels={35}
        colors={["#FF5F6D", "#2574fb"]}
        textColor={"#111"}
        needleColor={"#606060"}
        needleBaseColor={"#606060"}
        animate={true}
        arcWidth={0.2}
        hideText={true}
        percent={
          data?.details
            ? (data.value - data.details.min) /
              (data.details.max - data.details.min)
            : data?.value
            ? data.value / 100
            : 0
        }
        // cornerRadius={12}
        //   formatTextValue={() => `${data.value}${data.unit}`}
      />
      {data?.details && (
        <>
          <div
            style={{
              position: "absolute",
              left: 10,
              bottom: -6,
              color: "lightGrey",
            }}
          >
            {data.details.min.toFixed(2)}
          </div>
          <div
            style={{
              position: "absolute",
              right: 6,
              bottom: -6,
              color: "lightGrey",
            }}
          >
            {data.details.max.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(GuageChartMolecule);
