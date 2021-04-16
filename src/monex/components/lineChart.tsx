import { useEffect, useRef } from 'react';
import * as React from 'react';
import { Chart } from 'chart.js';

interface LineChart {
    width:string;
    height:string;
    stepSize:number;
    title:string;
}



const LineChart: React.FC<LineChart> = (props) => {

    const chartRef = useRef<HTMLCanvasElement>(null);


    const graphOptions : Chart.ChartConfiguration = {
        type: 'line',
        data: {
            datasets: [{
                label: 'Memory Used',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 0
            },
            {
                label: 'Memory Committed',
                data: [],
                backgroundColor: 'rgba(60, 99, 132, 0.1)',
                borderColor: 'rgba(60, 99, 132, 1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 0

            }
            ]
        },
        options: {
            responsive:true,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            color: "#363636",
                        },
                        ticks: {
                            fontColor: "#a3a7a9",
                        },
                        type: "time",
                        time: {
                            parser: "HH:mm",
                            unit: "minute",
                            unitStepSize: 10,
                            displayFormats: {
                                millisecond: "HH:mm",
                                second: "HH:mm",
                                minute: "HH:mm",
                                hour: "HH:mm"
                            }
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: "#363636",

                        },
                        ticks: {
                            beginAtZero: true,
                            max: 2000,
                            fontColor: "#a3a7a9",
                            callback: (value, index, values) => {
                                return `${value} MB`
                            }
                        },
                    }
                ]
            },

            legend: {
                position: "bottom",
                align: "start",
                labels: {

                    // This more specific font property overrides the global property
                    fontColor: '#a3a7a9',
                    boxWidth: 1,
                    padding: 20,
                    usePointStyle: true
                }
            },
            title: {
                display: false,
                text: props.title,
                fontColor: "#fff",
                fontSize: 26
            },
            tooltips: {
                enabled: true,
                mode: "index",
                intersect: false
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    };

    useEffect(() => {
        if (!chartRef || !chartRef.current) return;

        new Chart(chartRef.current,graphOptions);
    });

    return (
        <div className="chart--container">
            <h3 className="chart--header"> <i className="fa fa-area-chart" aria-hidden="true"></i> java memory</h3>
            <canvas ref={chartRef} width={props.width} height={props.height} ></canvas>
        </div>
    )
}


export default LineChart
