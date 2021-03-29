import React from 'react'
import StateWidget from './StateWidget';

const DBState = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }
    return (
        <div style={style}>
        {/* <h3 className="db-state__header">Database State</h3> */}
        <div className="db-state">
            <StateWidget state="danger" title="running queries" value="10"/>
            <StateWidget state="" title="active threads" value="2"/>
            <StateWidget state="healthy" title="number of connections" value="01"/>
            <StateWidget state="warnning" title="waiting threads" value="00"/>
        </div>
        </div>
    )
}

export default DBState
