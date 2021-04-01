import React, { useContext, useEffect, useRef, useState } from 'react';
import * as chartjs from 'chart.js';
import { ChartData, Doughnut } from 'react-chartjs-2';
import { DBContext } from './DBConext';
import { Monitoring } from './api/classes';
import { DUMMY_CONSTS } from './api/dummy';

const DiskSpace = (props) => {
    const [diskUsage, setDiskUsage] = useState([0, 100]);
    const { monitorContext: { monitor, pause } } = useContext(DBContext);

    useEffect(() => monitor.listen(
        Monitoring.DataTypeName.disk,
        diskData => {
            if (!pause) {
                const usage = Math.round(diskData.usage / DUMMY_CONSTS._maxDiskUsage * 100);
                setDiskUsage([usage, 100 - usage]);
            }
        },
        1000,
    ), [monitor, pause]);
    const data: ChartData<chartjs.ChartData> = {
        datasets: [
            {
                data: diskUsage,
                backgroundColor: ["rgba(97, 177, 90,0.9)", "rgba(255, 255, 255, 1)",],
                borderWidth: 0,
            },
        ]
    };
    const options: chartjs.ChartOptions = {
        responsive: false,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 80,
        tooltips: {
            enabled: false
        }
    };


    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }
    return (
        <div className="disk-space" style={style}>
            <h3 className="disk-text">Disk Usage</h3>
            {/* <canvas ref={chartRef} width="300px" height="150px" className="disk-canvas"> */}
            <div style={{ width: 300, height: 150 }} className="disk-canvas">
                <Doughnut data={data} options={options} width={300} height={150} />
            </div>
            <span className="disk-space__precentage">{diskUsage[0]}%</span>
        </div>
    )
}

export default DiskSpace
