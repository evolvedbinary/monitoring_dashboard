import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import * as chartjs from 'chart.js';
import { ChartData, Line } from 'react-chartjs-2';
import { DBContext } from './DBConext';
import { Monitoring } from './api/classes';

type MemoryUsage = { heap: {x:number,y:number}[], nonHeap: {x:number,y:number}[] };
interface MemoryChartProps {
    gridArea:string
}

const MemoryChart : React.FC<MemoryChartProps> = (props) => {
    const [memoryUsage, setMemoryUsage] = useState<{ state: MemoryUsage, display: MemoryUsage }>({ state: {heap:[],nonHeap:[]}, display: {heap:[],nonHeap:[]} });
    const [memoryWarnning, setMemoryWarnning] = useState(false);
    const { monitorContext: { monitor, pause } } = useContext(DBContext);


    useEffect(() => monitor.listen(
        Monitoring.DataTypeName.memory,
        memoryData => {
            setMemoryUsage(({ state, display }) => {
                const usage = {
                    heap: {
                        x: Date.now(),
                        y: memoryData.heapMemoryUsage.used,
                    },
                    nonHead: {
                        x: Date.now(),
                        y: memoryData.nonHeapMemoryUsage.used,
                    } 
                };
    
                if(state.heap.length > 40) { // NOTE(YB):we need a constant to indecate how many points we want the chart to hold
                    state.heap.shift();
                    state.nonHeap.shift();
                }
                if(usage.heap.y > 1000) setMemoryWarnning(true);
                const newState = {
                    heap:[...state.heap, usage.heap],
                    nonHeap:[...state.nonHeap, usage.nonHead]
                };
                return {
                    state: newState,
                    display: pause ? display : newState,
                };
            });
        },
        1000
    ), [monitor, pause]);
    const colors  = {
        gridLines : "#4b4b4b",
        fontColor: "#e9e9e9",
    };
    if(localStorage.theme === "light") {
        colors.gridLines = "#ccc";
        colors.fontColor = "#616161";
    }
    

    const data: ChartData<chartjs.ChartData> = {
        datasets: [{
            label: "Heap Memory Usage",
            backgroundColor: 'rgba(0, 148, 198, 0.1)',
            borderColor: 'rgba(0, 148, 198, 1)',
            data: memoryUsage.display.heap,
            fill: true,
            pointRadius: 0,

        },
        {
            label: "Non Heap Memory Usage",
            backgroundColor: 'rgba(137, 99, 186, 0.1)',
            borderColor: 'rgba(137, 99, 186, 1)',
            data: memoryUsage.display.nonHeap,
            fill: true,
            pointRadius: 0,
        }
        ]
    };

    const options: chartjs.ChartOptions =  {
        responsive: true,
        maintainAspectRatio:false,
        title:{
            display:memoryWarnning,
            text:"Warnning Approaching Max Memory",
            fontColor:"rgba(236, 70, 70,0.9)",
            fontSize:20,
        },
        legend:{
            align:"start",
            position:"bottom",
            labels:{
                fontColor: colors.fontColor,
                fontSize:15,
                boxWidth:3,
                usePointStyle:true,
            }
        },
        animation:{
            duration:0
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
                        color: colors.gridLines,
                    },
                    ticks: {
                        fontColor: colors.fontColor,
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
                        color: colors.gridLines,
                    },
                    ticks:{
                        fontColor: colors.fontColor,
                        callback:(value:string,idx:number,vlaues:string[]) => {
                            const tick = Math.round(+value / 1024 / 1024 / 1024)
                            return `${tick} MB`
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
            <div className="chart">
                <Line data={data} options={options} height={350}/>
            </div>
        </div>
    )
}

export default MemoryChart
