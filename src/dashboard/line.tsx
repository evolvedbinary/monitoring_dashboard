import { Chart, ChartData, ChartOptions, registerables, Tick } from 'chart.js';
Chart.register(...registerables);
import 'chartjs-adapter-date-fns';

import React, { useEffect, useRef } from 'react';

interface LineProps {
    options?: ChartOptions<"line">;
    data: ChartData<"line">;
    width?: number;
    height?: number;
    tickFunction?: (tickValue: string | number, index: number, ticks: Tick[]) => string;
}

const Line: React.FC<LineProps> = (props) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const chart = new Chart(ref.current, {
            type: "line",
            data: props.data,
            options: {
                ...props.options,
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    x:{
                        grid:{
                            color: "#4b4b4b",
                        },
                        ticks:{
                            color:"#e9e9e9",
                            maxRotation:0,
                        },
                        type:"time",
                        time: {
                            unit:"second",
                            stepSize:5,
                            displayFormats:{
                                millisecond: "HH:mm:ss",
                                second: "HH:mm:ss",
                                minute: "HH:mm",
                                hour: "HH:mm"
                            }
                        }
                    },
                    y:{
                        grid:{
                            drawBorder:false,
                            color:"#4b4b4b",
                        },
                        ticks:{
                            color:"#e9e9e9",
                            callback: props.tickFunction
                        }
                    }
                },
                animation: {
                    duration:0
                },
                elements:{
                    line:{
                        tension:0,
                    }
                },
                plugins: {
                    legend: {
                        align: "start",
                        position: "bottom",
                        labels: {
                            font: {
                                size: 15,
                            },
                            color: "#ccc",
                            usePointStyle: true,
                            pointStyle: "dash"
                        }
                    },
                    ...props.options?.plugins,
                },
            }
        });

        return (() => {
            chart.destroy();
        })
    }, []);
    return (
        <div className="chart">
            <canvas ref={ref} width={props.width} height={props.height}></canvas>
        </div>
    )
}

export default Line;
