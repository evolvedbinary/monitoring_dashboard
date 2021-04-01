import React, { useContext } from 'react'
import DBButton from './DBButton'
import { DBContext } from './DBConext'

const DBActions = (props) => {
    const { monitorContext, setMonitorContext } = useContext(DBContext);
    const style : React.CSSProperties= {
        gridArea: props.gridArea,
    }
    return (
        <div className="db-actions" style={style}>
            <DBButton icon="search" grid="trace" text="trace" clicked={monitorContext.trace} onClick={() => setMonitorContext({ ...monitorContext.pause, trace: !monitorContext.trace })}/>
            <DBButton icon="pause" grid="pause" text="pause" clicked={monitorContext.pause} onClick={() => setMonitorContext({ ...monitorContext, pause: !monitorContext.pause })}/>
            <DBButton icon="bolt" grid="clear" text="clear grabage" clicked={false}/>

        </div>
    )
}

export default DBActions
