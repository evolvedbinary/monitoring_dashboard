import * as React from 'react'
import * as chartjs from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fromEvent } from 'rxjs';
import { bufferTime, filter, finalize, map, repeat, switchAll, takeUntil, tap, throttleTime } from 'rxjs/operators';

interface HealthProps {
    gridArea: string
}

const options: chartjs.ChartOptions = {
    responsive: false,
    cutoutPercentage: 70,
    tooltips: {
        enabled: false
    }
};

const data = (color: string, percentage: number): chartjs.ChartData => {
    return {
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: [color, "rgba(255, 255, 255, 1)",],
                borderWidth: 0,
            },
        ]
    }
};

const DBHealth: React.FC<HealthProps> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }
    const [health, setHealth] = React.useState(30);

    const dbHealthColor = health < 50 ? 'rgba(97, 177, 90,0.9)'
        : health < 90 ? 'rgba(239, 123, 69,0.9)'
            : 'rgba(236, 70, 70,0.9)';

    return (
        <div style={style} className="health">
            <div className="popup" >
                some text
                and alot of details about the disk
            </div>
            <h3>Databse Health</h3>
            <div className="health-chart">
                <span className="percentage">{health}%</span>
                <Doughnut data={data(dbHealthColor, health)} options={options} />
            </div>
        </div>
    )
}

export default DBHealth
