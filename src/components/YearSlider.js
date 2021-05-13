import React from "react";
import "../style/yearSlider.scss";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

function YearSlider({ setYear, year }) {
  const handleChange = (event, newValue) => {
    setYear(newValue);
  };

  return (
    <div className="yearSlider">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>1990</Grid>
        <Grid item xs>
          <Slider
            value={year}
            min={1990}
            step={1}
            max={2018}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
        </Grid>
        <Grid item>2018</Grid>
      </Grid>
    </div>
  );
}

export default React.memo(YearSlider);
