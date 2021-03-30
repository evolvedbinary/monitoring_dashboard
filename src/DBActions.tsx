import React, { useContext } from 'react'
import DBButton from './DBButton'
import { DBContext } from './DBConext'

const DBActions = (props) => {
    const {monitor, setMonitor} = useContext(DBContext);
    const style : React.CSSProperties= {
        gridArea: props.gridArea,
    }
    return (
        <div className="db-actions" style={style}>
            <DBButton icon="search" grid="trace" text="trace" clicked={monitor.trace} onClick={() => setMonitor({pause: monitor.pause,trace: !monitor.trace})}/>
            <DBButton icon="pause" grid="pause" text="pause" clicked={monitor.pause} onClick={() => setMonitor({pause: !monitor.pause,trace: monitor.trace})}/>
            <DBButton icon="bolt" grid="clear" text="clear grabage" clicked={false}/>

        </div>
    )
}

export default DBActions
