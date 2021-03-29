import React, { useState } from 'react'

const DBButton = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.grid,
    };
     const [clicked, setClicked] = useState(false);
    return (
        <div className={clicked ? "db-button db-button__clicked" : "db-button"} style={style} onClick={() => setClicked(!clicked)}>
            <h3>{props.text}</h3>
            <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
        </div>
    )
}

export default DBButton