import React from 'react';

const StateWidget = (props) => {
    return (
        <div className={`state-widget ${props.state}`}>
            <div className="state-title">
                {props.title} 
            </div>
            <div className="state-value">
                {props.value}
            </div>
        </div>
    )
}

export default StateWidget
