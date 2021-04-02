import React, { useState } from 'react'


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
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }

    const [state, setState] = useState({
        queries:103,
        activeThreads:2,
        nbrConnections:10,
        waitingThreads: 0,
    })

    return (
        <div style={style}>
        {/* <h3 className="db-state__header">Database State</h3> */}
        <div className="db-state">
            <StateWidget state="danger" title="running queries" value={state.queries}/>
            <StateWidget state="healthy" title="active threads" value={state.activeThreads}/>
            <StateWidget state="healthy" title="number of connections" value={state.nbrConnections}/>
            <StateWidget state="warnning" title="waiting threads" value={state.waitingThreads}/>
        </div>
        </div>
    )
}

export default DBState
