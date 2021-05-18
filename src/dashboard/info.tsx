import React from 'react'

interface InfoProps {
    gridArea:string,
}

const Info :React.FC<InfoProps> = (props) => {
    const style : React.CSSProperties = {
        gridArea: props.gridArea,
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"space-around",
        flexDirection:"column",
        gap:"10px",
    }
    return (
        <div style={style}>
          <h3>DB Version: 3.5.0</h3>
          <h3>HostName: ZNAME</h3>
        </div>
    )
}

export default Info