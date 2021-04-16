import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import { Monitoring } from './api/classes';
import { DBContext } from './DBConext';

interface StateWidgetProps {
    state:string,
    title:string,
    value:number,
}

const StateWidget : React.FC<StateWidgetProps> = (props) => {
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

interface StateProps {
    gridArea:string
}

const DBState : React.FC<StateProps> = (props) => {
    const { monitorContext: { monitor, pause } } = useContext(DBContext);
    const [{ queries, threads, connections }, setGlobal] = useState<{
        queries: Monitoring.QueryData,
        threads: Monitoring.ThreadData,
        connections: Monitoring.ConnectionData,
    }>({
        queries: {
            type: Monitoring.DataTypeName.query,
            running:0,
        },
        threads: {
            type: Monitoring.DataTypeName.thread,active:0,
            waiting:0,
        },
        connections: {
            type: Monitoring.DataTypeName.connection,
            active:0,
        },
    });

    useEffect(() => {
        if(pause) return;

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
                <StateWidget state="danger" title="running queries" value={queries.running} />
                <StateWidget state="healthy" title="active threads" value={threads.active} />
                <StateWidget state="healthy" title="number of connections" value={connections.active} />
                <StateWidget state="warnning" title="waiting threads" value={threads.waiting} />
            </div>
        </div>
    )
}

export default DBState
