import * as React from 'react';
import { useContext , useState } from 'react';
import * as chartjs from 'chart.js';
import { ChartData, Doughnut } from 'react-chartjs-2';
import { DBContext } from './DBContext';

interface DBHealthProps {
    gridArea: string
}

const DBHealth: React.FC<DBHealthProps> = (props) => {
    const [diskUsage, setDiskUsage] = useState([0, 100]);
    const { monitorContext: { monitor, pause } } = useContext(DBContext);
    const diskColor = diskUsage[0] < 50 ? 'rgba(97, 177, 90,0.9)'
        : diskUsage[0] < 90 ? 'rgba(239, 123, 69,0.9)'
            : 'rgba(236, 70, 70,0.9)';

    const data: ChartData<chartjs.ChartData> = {
        datasets: [
            {
                data: diskUsage,
                backgroundColor: [diskColor, "rgba(255, 255, 255, 1)",],
                borderWidth: 0,
            },
        ]
    };


    const options: any = {
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
            <div className="widget">
                <h3 className="disk-text">Database Health</h3>
                {/* <canvas ref={chartRef} width="300px" height="150px" className="disk-canvas"> */}
                <div style={{ width: 300, height: 150 }} className="disk-canvas">
                    <Doughnut data={data} options={options} width={300} height={150} />
                </div>
                <span className="disk-space__percentage">{diskUsage[0]}%</span>
            </div>
        </div>
    )
}

export default DBHealth
