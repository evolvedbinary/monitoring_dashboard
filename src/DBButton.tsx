import React from 'react'

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

export default DBButton
