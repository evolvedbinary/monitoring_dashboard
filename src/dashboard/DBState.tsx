import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import { Monitoring } from './api/classes';
import { DBContext } from './DBContext';

interface StateWidgetProps {
    state: string,
    title: string,
    value: number,
}

const StateWidget: React.FC<StateWidgetProps> = (props) => {
    return (
        <div className={`state-widget ${props.state}`}>
            <div className="state-title">
                {props.title}
            </div>
            <div className="state-value">
                {props.value}
            </div>
        </div>
    )
}

const colors = {
    gridLines: "#4b4b4b",
    fontColor: "#e9e9e9",
};
const d = JSON.parse(`[{"x":1618572856609,"y":10},{"x":1618572857606,"y":15},{"x":1618572858607,"y":15},{"x":1618572859604,"y":14},{"x":1618572860602,"y":20},{"x":1618572861610,"y":20},{"x":1618572862604,"y":25},{"x":1618572863606,"y":27},{"x":1618572864610,"y":35},{"x":1618572865606,"y":10}]`)

const options: chartjs.ChartOptions = {
    maintainAspectRatio: false,
    elements: {
        line: {
            tension: 0
        }
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: colors.gridLines,
                    zeroLineColor: colors.gridLines,
                },
                ticks: {
                    fontColor: colors.fontColor,
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
                    color: ["#ec4646", "#EF7B45", colors.gridLines, colors.gridLines, colors.gridLines, colors.gridLines, colors.gridLines, colors.gridLines, colors.gridLines],
                    drawBorder: false,
                    z: 0,
                },
                ticks: {
                    fontColor: colors.fontColor,
                    callback: (value: string, idx: number, values: string[]) => {
                        return `${value}%`
                    },
                }
            }
        ],
    },
}
const data = (color): chartjs.ChartData => {
    return {
        datasets: [
            {
                backgroundColor: `rgba(${color}, 0.1)`,
                borderColor: `rgba(${color}, 1)`,
                data: d,
                fill: true,
                pointRadius: 0,
            }
        ],
    }
}

const TransactionsChart: React.FC = () => {
    return <>
        <h3>Transactions</h3>
        <Line data={data("232, 153, 141")} options={options} />
    </>
}

interface StateProps {
    gridArea: string
}

const DBState: React.FC<StateProps> = (props) => {
    const { monitorContext: { monitor, pause } } = useContext(DBContext);
    const [{ queries, threads, connections }, setGlobal] = useState<{
        queries: Monitoring.QueryData,
        threads: Monitoring.ThreadData,
        connections: Monitoring.ConnectionData,
    }>({
        queries: {
            type: Monitoring.DataTypeName.query,
            running: 0,
        },
        threads: {
            type: Monitoring.DataTypeName.thread, active: 0,
            waiting: 0,
        },
        connections: {
            type: Monitoring.DataTypeName.connection,
            active: 0,
        },
    });

    useEffect(() => {
        if (pause) return;

        const thread = monitor.listen(
            Monitoring.DataTypeName.thread,
            threads => setGlobal(global => ({ ...global, threads })),
            1000
        )

        const connection = monitor.listen(
            Monitoring.DataTypeName.connection,
            connections => setGlobal(global => ({ ...global, connections })),
            1000
        )

        const query = monitor.listen(
            Monitoring.DataTypeName.query,
            queries => setGlobal(global => ({ ...global, queries })),
            1000
        )
        return () => {
            query();
            connection();
            thread();
        }
    }, [monitor, pause]);

    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }

    return (
        <div style={style}>
            <div className="db-state">
                <StateWidget state="danger" title="Transaction" value={queries.running} />
                <StateWidget state="healthy" title="running queries" value={threads.active} />
                <StateWidget state="healthy" title="connections" value={connections.active} />
                <StateWidget state="warning" title="waiting queries" value={threads.waiting} />
            </div>
        </div>
    )
}

export default DBState
