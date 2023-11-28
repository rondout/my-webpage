import * as React from "react";
import { alpha, lighten, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Iconfont from "./Iconfont";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyle = makeStyles((theme: Theme) => {
  return {
    toggleBtns: {
      padding: theme.spacing(),
      borderRadius: "50%",
      position: "absolute",
      top: "48%",
      cursor: "pointer",
      backgroundColor: alpha(lighten("#000", 0.5), 0.3),
      "&:hover": {
        backgroundColor: alpha(lighten("#000", 0.5), 0.5),
      },
    },
  };
});

function MatCarousel(props: { imgsPaths: string[]; initStep?: number }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(props.initStep || 0);
  const maxSteps = props.imgsPaths?.length;

  React.useEffect(() => {
    setActiveStep(props.initStep);
  }, [props.initStep]);

  const classes = useStyle();

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep !== maxSteps - 1) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep !== 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
      sx={{ flexGrow: 1, position: "relative", height: 1, display: "flex", alignItems: "center" }}
    >
      <SwipeableViews style={{ width: "100%" }} axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {props.imgsPaths?.map((imgPath, index) => (
          <div key={imgPath}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box>
                <img
                  style={{
                    height: "600px",
                    maxHeight: "80%",
                    display: "block",
                    maxWidth: "80%",
                    overflow: "hidden",
                    width: "fit-content",
                    margin: "auto",
                  }}
                  src={imgPath}
                  alt={imgPath}
                />
              </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      {activeStep !== 0 && (
        <Box className={classes.toggleBtns} sx={{ left: 16, transform: "rotate(180deg)" }} onClick={handleBack}>
          <Iconfont mr={0} color="#fff" icon="ic_arrow_right"></Iconfont>
        </Box>
      )}
      {activeStep !== maxSteps - 1 && (
        <Box className={classes.toggleBtns} sx={{ right: 16 }} onClick={handleNext}>
          <Iconfont mr={0} color="#fff" icon="ic_arrow_right"></Iconfont>
        </Box>
      )}
      <Box sx={{ position: "absolute", bottom: 16 }}>
        {activeStep + 1}/{maxSteps}
      </Box>
    </Box>
  );
}

export default MatCarousel;
