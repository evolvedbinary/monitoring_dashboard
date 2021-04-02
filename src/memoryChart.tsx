import React, { useContext, useEffect, useState } from 'react';
import * as chartjs from 'chart.js';
import { ChartData, Line } from 'react-chartjs-2';
import Memory from './api/memory';
import { DBContext } from './DBConext';

const chartOptions: Chart.ChartConfiguration = {
    type: 'line',
    data: {
        datasets: [{
            label: "Heap Memory Usage",
            backgroundColor: 'rgba(0, 148, 198, 0.1)',
            borderColor: 'rgba(0, 148, 198, 1)',
            data: [],
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
            fontSize: 20,
        },
        legend: {
            align: "start",
            position: "bottom",
            labels: {
                boxWidth: 3,
                usePointStyle: true,
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
                        color: "#363636",
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
                        },

                    }
                }
            ],
            yAxes: [
                {

                    gridLines: {
                        color: "#363636",
                    },
                    ticks: {
                        fontColor: "#a3a7a9",
                        callback: (value, idx, vlaues) => {
                            return `${value} MB`
                        },


                    }
                }
            ],
        },
    }
};

const MemoryChart = (props) => {
    const [memoryUsage, setMemoryUsage] = useState<{ heap: number[], nonHeap: number[] }>();
    const { monitorContext: { monitor, pause } } = useContext(DBContext);



    const data: ChartData<chartjs.ChartData> = {
        datasets: [{
            label: "Heap Memory Usage",
            backgroundColor: 'rgba(0, 148, 198, 0.1)',
            borderColor: 'rgba(0, 148, 198, 1)',
            data: [],
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
        }
        ]
    };

    const options: chartjs.ChartOptions =  {
        responsive: true,
        maintainAspectRatio:false,
        title:{
            display:true,
            text:"",
            fontColor:"#ccc",
            fontSize:20,
        },
        legend:{
            align:"start",
            position:"bottom",
            labels:{
                boxWidth:3,
                usePointStyle:true,
            }
        },
        elements: {
            line:{
                tension:0
            }
        },
        scales: {
            xAxes: [
                { 
                    gridLines: {
                        color: "#363636",
                    },
                    ticks: {
                        fontColor: "#a3a7a9",
                        maxTicksLimit:10,
                        maxRotation:0
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
                        color: "#363636",
                    },
                    ticks:{
                        fontColor: "#a3a7a9",
                        callback:(value,idx,vlaues) => {
                            return `${value} MB`
                        },


                    }
                }
            ],
        },
    };

    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }

    return (
        <div className="memory-chart" style={style}>
            <h3 className="memory-chart__header">java instance memory usage</h3>
            <Line data={data} options={options}/>
        </div>
    )
}

export default MemoryChart
