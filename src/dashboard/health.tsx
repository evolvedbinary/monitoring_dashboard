import React from 'react';
import Doughnut from './doughnut';

const Health : React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    };

    return (
        <div className="health" style={style}>
            <h3>Health</h3>
            <Doughnut value={40}/>
        </div>
    )
}

export default Health
