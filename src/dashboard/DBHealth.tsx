import * as React from 'react'

interface HeathProps {
    gridArea:string
}

const DBHealth : React.FC<HeathProps> = (props) => {
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
