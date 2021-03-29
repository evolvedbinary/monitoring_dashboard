import React from 'react'
import DBButton from './DBButton'

const DBActions = (props) => {
    const style : React.CSSProperties= {
        gridArea: props.gridArea,
    }
    return (
        <div className="db-actions" style={style}>
            <DBButton icon="search" grid="trace" text="trace"/>
            <DBButton icon="pause" grid="pause" text="pause"/>
            <DBButton icon="bolt" grid="clear" text="clear grabage"/>

        </div>
    )
}

export default DBActions
