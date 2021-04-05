import React, { useContext } from 'react'
import { DBContext } from './DBConext'

const DBButton = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.grid,
    };

    return (
        <div className={props.clicked ? "db-button db-button__clicked" : "db-button"} style={style} onClick={props.onClick}>
            <h3>{props.text}</h3>
            <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
        </div>
    )
}



const DBActions = (props) => {
    const { monitorContext, setMonitorContext } = useContext(DBContext);
    const style : React.CSSProperties= {
        gridArea: props.gridArea,
    }
    return (
        <div className="db-actions" style={style}>
            <DBButton icon="search" grid="trace" text="trace" clicked={monitorContext.trace} onClick={() => setMonitorContext({ ...monitorContext, trace: !monitorContext.trace })}/>
            <DBButton icon="pause" grid="pause" text="pause" clicked={monitorContext.pause} onClick={() => setMonitorContext({ ...monitorContext, pause: !monitorContext.pause })}/>
            <DBButton icon="bolt" grid="clear" text="clear grabage" clicked={false}/>
        </div>
    )
}

export default DBActions
