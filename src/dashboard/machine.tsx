import { ChartData, ChartOptions } from 'chart.js';
import React from 'react';
import Line from './line';

const d = JSON.parse(`[{"x":1618572856609,"y":10},{"x":1618572857606,"y":15},{"x":1618572858607,"y":15},{"x":1618572859604,"y":14},{"x":1618572860602,"y":20},{"x":1618572861610,"y":20},{"x":1618572862604,"y":25},{"x":1618572863606,"y":27},{"x":1618572864610,"y":35},{"x":1618572865606,"y":10}]`)

const data = (color) : ChartData<"line"> => {
    return {
        datasets: [
            {
                backgroundColor: `rgba(${color}, 0.1)`,
                borderColor: `rgba(${color}, 1)`,
                data: d,
                fill: true,
                pointRadius: 0,
            }
        ],
    }
}

const options: ChartOptions<"line"> = {
    plugins:{
      legend:{
          display:false
      }
    }
  }


// system memoryChart
const MemChart: React.FC = () => {
    return <div>
        <h4>System Memory</h4>
        <Line data={data("171, 200, 192")} options={options} />
    </div>
}

// cpu chart
const CpuChart: React.FC = () => {
    return <div>
        <h4>CPU</h4>
        <Line data={data("232, 153, 141")} options={options} />
    </div>
}
// network IO
const NetChart: React.FC = () => {
    return <div>
        <h4>Network Usage</h4>
        <Line data={data("253, 231, 76")} options={options} />
    </div>
}

// disk IO
const DiskIO : React.FC = () => {
    return (
        <div>
            <h4>Disk IO</h4>
            <Line data={data("32, 163, 158")} options={options} />
        </div>
    )
}

const Machine : React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
      gridArea: props.gridArea,
    };
  
    return (
        <div className="machine" style={style}>
            <NetChart />
            <CpuChart />
            <MemChart />
            <DiskIO />
        </div>
    )
}

export default Machine
