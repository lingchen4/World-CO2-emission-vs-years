import React from "react";
import "../style/popup.scss";

function Popup({ name, info }) {
  // if info empty, return error message
  return info && info.co2 ? (
    <div>
      <p className="popup-country">
        {name} (Year: {info["year"]})
      </p>
      <p className="popup-co2 color-secondary">
        <span className="color-white">CO2 (million tonnes): </span>
        <span className="font-bold">{info["co2"]}</span>
      </p>
      <p className="popup-average color-secondary">
        <span className="color-white">
          Cumulative CO2 (million tonnes):&nbsp;
        </span>
        <span className="font-bold">{info["cumulative_co2"]}</span>
      </p>
      <p className="popup-moreInfo">
        Click For Details <span className="popup-enter">&#8594;</span>
      </p>
    </div>
  ) : (
    <div className="color-red font-bold">
      <p className="popup-country color-white">{name}</p>
      Sorry, we do not have information for this area!!
    </div>
  );
}

export default React.memo(Popup);
