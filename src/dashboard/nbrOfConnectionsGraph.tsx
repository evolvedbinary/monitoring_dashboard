import React from 'react';
import * as chartjs from 'chart.js';
import { Line } from 'react-chartjs-2';

const colors = {
    gridLines: "#4b4b4b",
    fontColor: "#e9e9e9",
};
const d = JSON.parse(`[{"x":1618572856609,"y":10},{"x":1618572857606,"y":15},{"x":1618572858607,"y":15},{"x":1618572859604,"y":14},{"x":1618572860602,"y":20},{"x":1618572861610,"y":20},{"x":1618572862604,"y":25},{"x":1618572863606,"y":27},{"x":1618572864610,"y":35},{"x":1618572865606,"y":10}]`)

const options: chartjs.ChartOptions = {
    maintainAspectRatio:false,
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
                    color: colors.gridLines,
                    drawBorder:false,
                    z:0,
                },
                ticks: {
                    fontColor: colors.fontColor,
                    callback: (value: string, idx: number, values: string[]) => {
                        return `${value}`
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

const NumberOfConnectionsGraph : React.FC<{gridArea:string}> = (props) => {
    const style :React.CSSProperties= {
        gridArea: props.gridArea,
    }

    return (
        <div style={style}>
            <h3>Number Of Connections History</h3>
            <Line data={data("171, 200, 192")} options={options} />
        </div>
    )
}

export default NumberOfConnectionsGraph;
