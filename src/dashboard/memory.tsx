import { ChartData, ChartOptions, Tick } from 'chart.js';
import React from 'react'
import Line from './line';

const d = JSON.parse(`[{"x":1618572856609,"y":10},{"x":1618572857606,"y":15},{"x":1618572858607,"y":15},{"x":1618572859604,"y":14},{"x":1618572860602,"y":20},{"x":1618572861610,"y":20},{"x":1618572862604,"y":25},{"x":1618572863606,"y":27},{"x":1618572864610,"y":35},{"x":1618572865606,"y":10}]`)


const data: ChartData<"line"> = {
  datasets: [{
    label: "Heap Memory Usage",
    backgroundColor: 'rgba(0, 148, 198, 0.1)',
    borderColor: 'rgba(0, 148, 198, 1)',
    data: d,
    fill: true,
    pointRadius: 0,
  },
  {
    label: "Non Heap Memory Usage",
    backgroundColor: 'rgba(137, 99, 186, 0.1)',
    borderColor: 'rgba(137, 99, 186, 1)',
    data: [],
    fill: true,
    pointRadius: 0,
  }]
};

const options: ChartOptions<"line"> = {
  plugins:{
    title:{
      display:false,
      text:"Warning Approaching Max Memory",
      color:"rgba(236, 70, 70,0.9)",
      font: {
        size:20,
      }  
    },
  }
}

const tickFunction = (tickValue: string | number, index: number, ticks: Tick[])  => {
  return `${tickValue} MB`;
}

const Memory : React.FC<{ gridArea: string }> = (props) => {
  const style: React.CSSProperties = {
    gridArea: props.gridArea,
  };

  return (
    <div style={style}>
      <h3>Java Memory</h3>
      <Line data={data} options={options} tickFunction={tickFunction}/>
    </div>
  );
}

export default Memory
