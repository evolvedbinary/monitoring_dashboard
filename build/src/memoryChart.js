import React, {useContext, useEffect, useRef, useState} from "../_snowpack/pkg/react.js";
import {Chart} from "../_snowpack/pkg/chartjs.js";
import Memory from "./api/memory.js";
import {DBContext} from "./DBConext.js";
const chartOptions = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Heap Memory Usage",
        backgroundColor: "rgba(0, 148, 198, 0.1)",
        borderColor: "rgba(0, 148, 198, 1)",
        data: [],
        fill: true,
        pointRadius: 0
      },
      {
        label: "Non Heap Memory Usage",
        backgroundColor: "rgba(137, 99, 186, 0.1)",
        borderColor: "rgba(137, 99, 186, 1)",
        data: [],
        fill: true,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "",
      fontColor: "#ccc",
      fontSize: 20
    },
    legend: {
      align: "start",
      position: "bottom",
      labels: {
        boxWidth: 3,
        usePointStyle: true
      }
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "#363636"
          },
          ticks: {
            fontColor: "#a3a7a9",
            maxTicksLimit: 10,
            maxRotation: 0
          },
          type: "time",
          time: {
            parser: "HH:mm",
            unit: "second",
            unitStepSize: 5,
            displayFormats: {
              millisecond: "HH:mm:ss",
              second: "HH:mm:ss",
              minute: "HH:mm",
              hour: "HH:mm"
            }
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: "#363636"
          },
          ticks: {
            fontColor: "#a3a7a9",
            callback: (value, idx, vlaues) => {
              return `${value} MB`;
            }
          }
        }
      ]
    }
  }
};
const MemoryChart = (props) => {
  const {monitor, setMonitor} = useContext(DBContext);
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (!chartRef || !chartRef.current)
      return;
    const chartInstance = new Chart(chartRef.current, chartOptions);
    Memory.subscribe((v) => {
      const heap = v.heapMemoryUsage;
      const Nheap = v.nonHeapMemoryUsage;
      const nUsed = Nheap.used / 1024 / 1024 / 1024 + 1e4;
      const used = heap.used / 1024 / 1024 / 1024;
      chartInstance.data?.datasets[0].data?.push({x: Date.now(), y: used});
      chartInstance.data?.datasets[1].data?.push({x: Date.now(), y: nUsed});
      if (chartInstance.data?.datasets[0].data.length > 20)
        chartInstance.data?.datasets[0].data.shift();
      if (chartInstance.data?.datasets[1].data.length > 20)
        chartInstance.data?.datasets[1].data.shift();
      if (used > 15e3) {
        chartInstance.options.title.fontColor = "rgba(236, 70, 70,1)";
        chartInstance.options.title.text = "(Warning Approaching Max Memory)";
      } else {
        chartInstance.options.title.fontColor = "rgba(202, 204, 204, 1)";
        chartInstance.options.title.text = "";
      }
      chartInstance.update({
        duration: 0
      });
    });
    if (!monitor.pause) {
      Memory.start();
    }
    return () => {
      chartInstance.destroy();
      Memory.stop();
    };
  }, [monitor.pause]);
  const style = {
    gridArea: props.gridArea
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "memory-chart",
    style
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "memory-chart__header"
  }, "java instance memory usage"), /* @__PURE__ */ React.createElement("canvas", {
    ref: chartRef,
    width: "inherit",
    height: "350px"
  }));
};
export default MemoryChart;
