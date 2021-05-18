import React from 'react';
import * as chartjs from 'chart.js';
import { Line } from 'react-chartjs-2';

const colors = {
    gridLines: "#4b4b4b",
    fontColor: "#e9e9e9",
};
const d = JSON.parse(`[{"x":1618572856609,"y":10},{"x":1618572857606,"y":15},{"x":1618572858607,"y":15},{"x":1618572859604,"y":14},{"x":1618572860602,"y":20},{"x":1618572861610,"y":20},{"x":1618572862604,"y":25},{"x":1618572863606,"y":27},{"x":1618572864610,"y":35},{"x":1618572865606,"y":10}]`)

const options: chartjs.ChartOptions = {
    elements: {
        line: {
            tension: 0
        }
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: colors.gridLines,
                    zeroLineColor:colors.gridLines,
                },
                ticks: {
                    fontColor: colors.fontColor,
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
                    },

                }
            }
        ],
        yAxes: [
            {

                gridLines: {
                    color: ["#ec4646","#EF7B45",colors.gridLines,colors.gridLines,colors.gridLines,colors.gridLines,colors.gridLines,colors.gridLines,colors.gridLines],
                    drawBorder:false,
                    z:0,
                },
                ticks: {
                    fontColor: colors.fontColor,
                    callback: (value: string, idx: number, vlaues: string[]) => {
                        return `${value}%`
                    },
                }
            }
        ],
    },
}
const data = (color) : chartjs.ChartData => {
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
const style: React.CSSProperties = {
    background: "var(--theia-quickInput-background)",
    padding: "1rem",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
}
// system memoryChart
const MemChart: React.FC = () => {
    return <div style={style}>
        <h3>System Memory</h3>
        <Line data={data("171, 200, 192")} options={options} />
    </div>
}

// cpu chart
const CpuChart: React.FC = () => {
    return <div style={style}>
        <h3>Cpu</h3>
        <Line data={data("232, 153, 141")} options={options} />
    </div>
}
// network IO
const NetChart: React.FC = () => {
    return <div style={style}>
        <h3>Network Usage</h3>
        <Line data={data("253, 231, 76")} options={options} />
    </div>
}

// disk IO
const DiskIO : React.FC = () => {
    return (
        <div style={style}>
            <h3>Disk IO</h3>
            <Line data={data("32, 163, 158")} options={options}/>
        </div>
    )
}


interface SystemProps {
    gridArea: string;
}

const System: React.FC<SystemProps> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
        display: "flex",
        gap:"1rem",
        flexGrow:1,
        background: "transparent",
        padding: "0",
    }
    return (
        <div style={style}>
            <NetChart />
            <CpuChart />
            <MemChart />
            <DiskIO />
        </div>
    )
}

export default System
