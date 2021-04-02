import React, { useContext, useEffect, useState } from 'react'
import { Monitoring } from './api/classes';
import { DBContext } from './DBConext';


const StateWidget = (props) => {
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

const DBState = (props) => {
    const { monitorContext: { monitor, pause } } = useContext(DBContext);
    const [queries, setQueries] = useState<Monitoring.QueryData>({type:Monitoring.DataTypeName.query,running:0});
    const [threads, setThreads] = useState<Monitoring.ThreadData>({type:Monitoring.DataTypeName.thread,active:0,waiting:0});
    const [connections, setConnections] = useState<Monitoring.ConnectionData>({type:Monitoring.DataTypeName.connection,active:0});

    useEffect(() => {
        if(pause) return;

        const thread = monitor.listen(
            Monitoring.DataTypeName.thread,
            setThreads,
            1000
        )

        const connection = monitor.listen(
            Monitoring.DataTypeName.connection,
            setConnections,
            1000
        )

        const query = monitor.listen(
            Monitoring.DataTypeName.query,
            setQueries,
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
