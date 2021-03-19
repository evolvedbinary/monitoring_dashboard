import { useEffect, useRef } from 'react';
import * as React from 'react';
import { Chart } from 'chart.js';
import Memory from '../api/memory';

interface LineChart {
    width:string;
    height:string;
    stepSize:number;
    title:string;
}



const LineChart: React.FC<LineChart> = (props) => {

    const chartRef = useRef<HTMLCanvasElement>(null);


    

    useEffect(() => {

        const graphOptions : Chart.ChartConfiguration = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Memory Used',
                    data: [],
                    backgroundColor: '#36a2eb',
                    borderColor: '#36a2eb',
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
                                fontColor: "#a3a7a9",
                                callback: (value, index, values) => {
                                    return `${value} GB`
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

        if (!chartRef || !chartRef.current) return;

        const chartInstance = new Chart(chartRef.current,graphOptions);

        Memory.subscribe(v => {
            const heap = v.heapMemoryUsage;
            const max = heap.max / 1024 / 1024 / 1024 / 1024;

            if(chartInstance && chartInstance.options && chartInstance.options.scales && chartInstance.options.scales.yAxes && chartInstance.options.scales.yAxes[0].ticks) {
                chartInstance.options.scales.yAxes[0].ticks.max = max;
            }
            const used = heap.used / 1024 / 1024 / 1024 / 1024;
            const commited = heap.committed / 1024 / 1024 / 1024 / 1024;
            chartInstance.data?.datasets[0].data?.push({x:Date.now(), y: used});
            chartInstance.data?.datasets[1].data?.push({x:Date.now(), y: commited});

        

            const blue  = getComputedStyle(document.documentElement)
            .getPropertyValue('--blue');

            chartInstance.data.datasets[0].backgroundColor = blue;
            
            
            chartInstance.update({
                duration:0
            });

        })
        Memory.start();
    });

    return (
        <div className="chart--container">
            <h3 className="chart--header"> <i className="fa fa-area-chart" aria-hidden="true"></i> java memory</h3>
            <canvas ref={chartRef} width={props.width} height={props.height} ></canvas>
        </div>
    )
}


export default LineChart
