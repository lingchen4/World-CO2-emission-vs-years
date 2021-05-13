import React, { useState, useEffect, useCallback } from "react";
import ReactTooltip from "react-tooltip";
import { csv } from "d3";
import "./style/topology.scss";
import MapChart from "./components/MapChart";
import csvData from "./data/owid-co2-data.csv";
import YearSlider from "./components/YearSlider";
import Modal from "./components/utils/Modal";
import Detail from "./components/Detail";
import Spinner from "./components/utils/Spinner";

// I did not forget to remove comments!!!!!.
// Comments should be remove before deploy or by webpack.
// For better understanding, I keep comments on purpose.

function App() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [data, setData] = useState({});
  const [year, setYear] = useState(2004);
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState([]);

  // import csv file and rebuild the data structure (since json file is too large)
  // useCallback to memorize the results
  const handleCSV = useCallback((file) => {
    let dataListByISO = {};
    csv(file)
      .then((data) => {
        for (let element of data) {
          let name = element.iso_code;
          if (dataListByISO[name]) {
            dataListByISO[name].push(element);
          } else {
            dataListByISO[name] = [element];
          }
        }
      })
      .then(() => {
        setData(dataListByISO);
        setLoading(false);
      });
  }, []);

  // get data when component did mount
  useEffect(() => {
    handleCSV(csvData);
  }, [handleCSV]);

  // Loading spinner
  return loading ? (
    <Spinner width={"100px"} height={"100px"} />
  ) : (
    <div className="App">
      <h1 className="text-center">CO2 Emission By Year 1981</h1>
      <YearSlider year={year} setYear={setYear} />
      <MapChart
        setTooltipContent={setContent}
        data={data}
        year={year}
        setShow={setShow}
        setCountry={setCountry}
      />
      <ReactTooltip>{content}</ReactTooltip>
      <Modal handleClose={() => setShow(false)} show={show}>
        <Detail data={country} year={year} />
      </Modal>
    </div>
  );
}

export default React.memo(App);
