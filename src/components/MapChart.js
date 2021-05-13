import React, { useMemo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import Popup from "./Popup";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// add color scale
const getColorScale = () => {
  return scaleLinear().domain([0, 30]).range(["#ffedea", "#ff5233"]);
};

const MapChart = ({ setTooltipContent, data, year, setShow, setCountry }) => {
  const getInfo = (iso) => {
    // if data exsit, get info
    if (data[iso]) {
      const country = data[iso];
      // locat the position of specific year by using math approach so we have O(1), we can also use find method but speed is O(n).
      // [1990, 1991, .....2018]
      const endYear = country[country.length - 1].year;
      const targetYearPosition =
        country.length - 1 - (parseInt(endYear) - year);
      const countryInTargetYear = country[targetYearPosition];
      if (parseInt(countryInTargetYear?.year) === year) {
        const res = countryInTargetYear ? countryInTargetYear : "";
        return res;
      }
    }
    return "";
  };

  const colorscale = useMemo(() => getColorScale(year), [year]);
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { NAME, ISO_A3 } = geo.properties;
                const info = getInfo(ISO_A3);
                const share_global = info["share_global_co2"];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(<Popup name={NAME} info={info} />);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      setCountry(data[geo.properties.ISO_A3]);
                      setShow(true);
                    }}
                    style={{
                      default: {
                        fill: share_global
                          ? colorscale(share_global)
                          : "#D6D6DA",
                        outline: "1px",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "blue",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default React.memo(MapChart);
