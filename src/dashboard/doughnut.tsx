import { Chart , registerables} from 'chart.js';
Chart.register(...registerables);
import React, { useEffect, useRef, useState } from 'react';


const Doughnut : React.FC<{value: number}> = (props) => {
    const ref = useRef<HTMLCanvasElement>(null);
    
    const [Usage, setUsage] = useState([props.value, 100 - props.value]);
    const Color = Usage[0] < 50 ? 'rgba(97, 177, 90,0.9)'
        : Usage[0] < 90 ? 'rgba(239, 123, 69,0.9)'
            : 'rgba(236, 70, 70,0.9)';


    useEffect(() => {
        if (!ref.current) return;
        const chart = new Chart(ref.current, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: Usage,
                        backgroundColor: [Color, "rgba(255, 255, 255, 1)",],
                        borderWidth: 0,
                    }
                ]
            },
            options:{
                responsive:false,
                maintainAspectRatio:false,
                cutout:"80%",
                circumference:180,
                rotation:270,

                plugins:{
                    tooltip:{
                        enabled:false
                    }
                }
            }
        });

        return (() => {
            chart.destroy();
        })
    }, []);
    return (
        <div className="doughnut">
            <canvas ref={ref} height="150"></canvas>
            <span className="percentage">{Usage[0]}%</span>
        </div>
    )
}

export default Doughnut
