import React, {useEffect, useRef} from "../_snowpack/pkg/react.js";
import {Chart} from "../_snowpack/pkg/chartjs.js";
const DiskSpace = (props) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [60, 40],
            backgroundColor: ["rgba(97, 177, 90,0.9)", "rgba(255, 255, 255, 1)"],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: false,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 80,
        tooltips: {
          enabled: false
        }
      }
    });
  }, []);
  const style = {
    gridArea: props.gridArea
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "disk-space",
    style
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "disk-text"
  }, "Disk Usage"), /* @__PURE__ */ React.createElement("canvas", {
    ref: chartRef,
    width: "300px",
    height: "150px",
    className: "disk-canvas"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "disk-space__precentage"
  }, "60%"));
};
export default DiskSpace;
