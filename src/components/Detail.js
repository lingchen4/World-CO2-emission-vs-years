import React, { useState, useEffect } from "react";
import "../style/detail.scss";

function Detail({ data, year }) {
  const [info, setInfo] = useState({});
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const getInfoByYear = (time) => {
      // make sure we have the data
      if (data && data[0]) {
        // get current year info
        const endYear = data[data.length - 1].year;
        const targetYearPosition = data.length - 1 - (parseInt(endYear) - time);
        const countryInTargetYear = data[targetYearPosition];
        if (parseInt(countryInTargetYear?.year) === time) {
          const res = countryInTargetYear ? countryInTargetYear : "";
          setInfo(res);
          setSelected(year);
        }
      }
    };
    getInfoByYear(year);
  }, [data, year]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    setInfo(data.find((e) => e.year === value));
  };

  // show the details, we can add more details by add items to array
  const showInfo = [
    { "CO2 (million tonnes)": info["co2"] },
    { "Cumulative CO2 (million tonnes)": info["cumulative_co2"] },
    { "Coal CO2 (million tonnes)": info["coal_co2"] },
    { "Gas CO2 (million tonnes)": info["gas_co2"] },
    { "Oil CO2 (million tonnes)": info["oil_co2"] },
    { "Trade CO2 (million tonnes)": info["trade_co2"] },
    { "Share Global CO2 (%)": info["share_global_co2"] },
    {
      "Share Global Cumulative CO2 (%)": info["share_global_cumulative_co2"],
    },
  ];
  // if data empty or undefined return error message
  return info["co2"] && data ? (
    <div className="detail">
      <div>
        <h1 className="detail-title">{info.country} </h1>
        <p className="detail-subheader">Year of {selected}</p>
        <select
          className="detail-select"
          onChange={handleChange} // filter data by year
          value={selected}
        >
          <option type="text" value={year}>
            Select Year
          </option>
          {/* make copy of data and map the selections in reverse order */}
          {data
            ?.slice(0)
            .reverse()
            .map((element) => (
              <option value={element.year} key={element.year}>
                {element.year}
              </option>
            ))}
        </select>
        <div>
          <ul className="detail-list">
            {showInfo.map((e) => (
              <li className="detail-list-item" key={Object.keys(e)}>
                {Object.keys(e)}:{" "}
                <span className="color-green">{Object.values(e)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="detail-no-info">
      Sorry, we do not have information for this area!!
    </div>
  );
}

export default React.memo(Detail);
