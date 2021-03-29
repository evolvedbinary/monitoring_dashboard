import React from 'react'

const DBHealth = (props) => {
    const style :React.CSSProperties = {
        gridArea: props.gridArea,
        padding:"1rem 2rem",
    }
    return (
        <div style={style}>
            health
        </div>
    )
}

export default DBHealth
