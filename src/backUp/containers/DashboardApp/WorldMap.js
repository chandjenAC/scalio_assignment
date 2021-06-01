import React from "react";
import { ComposableMap, Geographies } from "react-simple-maps";
import { Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { formatNumber } from "../../utils";
const worldMapJson = require("../../meta/worldGeo110.json");

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

// const geoUrl =
//   "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

const WorldMap = ({
  setTooltipContent,
  tableData,
  fieldValues,
  selectedField,
}) => {
  let maxFieldValue = Math.max(...fieldValues);
  maxFieldValue = maxFieldValue * 1.4;
  let minFieldValue = Math.min(...fieldValues);
  minFieldValue = minFieldValue / 1.1;

  const colorScale = scaleQuantize()
    .domain([minFieldValue, maxFieldValue])
    .range([
      "#bbdbfa",
      "#a3d1ff",
      "#85c2ff",
      "#69b4ff",
      "#2590fa",
      "#2281e0",
      "#1c6bba",
      "#1a62ab",
      "#ff5533",
      "#12467a",
    ]);

  return (
    <div style={{ width: "100%" }}>
      <ComposableMap data-tip="" width={850} height={500}>
        <ZoomableGroup zoom={1} center={[25, 10]}>
          <Geographies geography={worldMapJson.features}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = tableData.tableData.find(
                  (s) => s.country?.countryCode === geo.properties.iso_a2
                );
                const { name } = geo.properties;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(
                        `${name} - ${
                          cur?.[selectedField]
                            ? formatNumber(cur[selectedField])
                            : "No info available"
                        }`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: cur?.[selectedField]
                          ? colorScale(
                              cur?.[selectedField] ? cur[selectedField] : "#EEE"
                            )
                          : "#e7e7e7",
                        outline: "red",
                      },
                      hover: {
                        fill: "#2574fb",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                    // fill="#9998A3"
                    stroke="#f7f7f7"
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
