import * as React from 'react';
import { useContext } from 'react'
import { DBContext } from './DBConext'

interface ButtonProps {
    text:string,
    grid:string,
    clicked:boolean,
    icon:string,
    onClick?:() => void
}

const DBButton : React.FC<ButtonProps> = (props) => {
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


interface ActionProps {
    gridArea:string,
}

const DBActions : React.FC<ActionProps> = (props) => {
    const { monitorContext, setMonitorContext } = useContext(DBContext);
    const style : React.CSSProperties= {
        gridArea: props.gridArea,
    }
    return (
        <div className="db-actions" style={style}>
            {/* <DBButton icon="search" grid="trace" text="trace" clicked={monitorContext.trace} onClick={() => setMonitorContext({ ...monitorContext, trace: !monitorContext.trace })}/> */}
            <DBButton icon="pause" grid="pause" text="pause" clicked={monitorContext.pause} onClick={() => setMonitorContext({ ...monitorContext, pause: !monitorContext.pause })}/>
            <DBButton icon="bolt" grid="clear" text="Preform GC" clicked={false}/>
        </div>
    )
}

export default DBActions
