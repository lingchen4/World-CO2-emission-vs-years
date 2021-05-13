import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function Spinner({ width, height }) {
  return (
    <div className="spinner">
      <CircularProgress
        style={{ width, height }}
        color="secondary"
      />
    </div>
  );
}

export default Spinner;
