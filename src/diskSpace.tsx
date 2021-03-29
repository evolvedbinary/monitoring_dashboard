import React, { useEffect, useRef } from 'react';
import {Chart} from 'chart.js';

const DiskSpace = (props) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = new Chart(chartRef.current,{
            type:"doughnut",
            data:{
                datasets:[
                    {
                        data:[60,40],
                        backgroundColor:["rgba(97, 177, 90,0.9)","rgba(255, 255, 255, 1)",],
                        borderWidth: 0,
                    },
                ]
            },
            options: {
                responsive:false,
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
                cutoutPercentage:80,
                tooltips:{
                    enabled:false
                }
            }
        });
    },[]);


    const style : React.CSSProperties= {
        gridArea: props.gridArea,
    }
    return (
        <div className="disk-space" style={style}>
            <h3 className="disk-text">Disk Usage</h3>
            <canvas ref={chartRef} width="300px" height="150px" className="disk-canvas">
            </canvas>
            <span className="disk-space__precentage">60%</span>
        </div>
    )
}

export default DiskSpace
