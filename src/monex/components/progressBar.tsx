import { useEffect, useRef } from "react";
import * as React from 'react'
import { Chart } from 'chart.js';

interface ProgressBar {
  bgcolor:string;
  completed:number;
}


const ProgressBar: React.FC<ProgressBar> = (props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const horizontalBarChartData: Chart.ChartConfiguration = {
      type: "horizontalBar",
      data: {
        labels: ["some long label"],
        datasets: [{
          backgroundColor: props.bgcolor,
          borderColor: "#F24C5D",
          borderWidth: 0.1,
          data: [props.completed],
          barPercentage: 1.1
        }]
      },
      options: {
        layout: {
          padding: {
            top: 0,
            bottom: 0,
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#363636",

              },
              ticks: {
                beginAtZero: true,
                max: 100,
                fontColor: "#ccc",
                fontSize:15,
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "#363636",

              },

              ticks: {
                padding: 0,
                fontSize:15,
                fontColor: "#ccc"
              },
              stacked: true
            }
          ]
        }
      }
    };
    if (!chartRef || !chartRef.current) return;
    new Chart(chartRef.current, horizontalBarChartData);
  });

  const style = {
    padding: "1rem",
  }
  return (
    <div style={style}>
      <canvas ref={chartRef} height="20px" ></canvas>
    </div>
  );
};

export default ProgressBar;
