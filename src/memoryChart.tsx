import React, { useContext, useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js';
import Memory from './api/memory';
import { DBContext } from './DBConext';

const chartOptions: Chart.ChartConfiguration = {
    type: 'line',
    data: {
        datasets: [{
            label:"Heap Memory Usage",
            backgroundColor: 'rgba(0, 148, 198, 0.1)',
            borderColor: 'rgba(0, 148, 198, 1)',
            data: [],
            fill: true,
            pointRadius:0,
            
        },
        {
            label:"Non Heap Memory Usage",
            backgroundColor: 'rgba(137, 99, 186, 0.1)',
            borderColor: 'rgba(137, 99, 186, 1)',
            data: [],
            fill: true,
            pointRadius:0,
        }
    ]
    },
    options: {
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
    }
};

const MemoryChart = (props) => {
    const {monitor, setMonitor} = useContext(DBContext);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [chart, setChart] = useState(null);
    useEffect(() => {
        if (!chartRef || !chartRef.current) return;
        const chartInstance = new Chart(chartRef.current, chartOptions);

        
        const sub = Memory.subscribe(v => {

            const heap = v.heapMemoryUsage;
            const Nheap = v.nonHeapMemoryUsage;

            const nUsed = Nheap.used / 1024 / 1024/ 1024 + 10000; 
            const used = heap.used / 1024 / 1024 / 1024;
            
            chartInstance.data?.datasets[0].data?.push({x:Date.now(), y: used});
            chartInstance.data?.datasets[1].data?.push({x:Date.now(), y: nUsed});
            if(chartInstance.data?.datasets[0].data.length > 20) chartInstance.data?.datasets[0].data.shift();
            if(chartInstance.data?.datasets[1].data.length > 20) chartInstance.data?.datasets[1].data.shift();

            if(used > 15000) {
                chartInstance.options.title.fontColor = "rgba(236, 70, 70,1)";
                chartInstance.options.title.text = "(Warning Approaching Max Memory)";
            }else {
                chartInstance.options.title.fontColor = "rgba(202, 204, 204, 1)";
                chartInstance.options.title.text = "";
            }

                        
            chartInstance.update({
                duration:0
            });

        });
        if(!monitor.pause) {
            Memory.start();
        }
           
        return () => {
            sub.unsubscribe();
            chartInstance.destroy();
            Memory.pause();
        }
    },[monitor.pause]);

    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }
    
    return (
        <div className="memory-chart" style={style}>
            <h3 className="memory-chart__header">java instance memory usage</h3>
            <canvas ref={chartRef} width="inherit" height="350px"></canvas>
        </div>
    )
}

export default MemoryChart
