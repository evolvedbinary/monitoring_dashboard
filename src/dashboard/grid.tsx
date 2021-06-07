import React from 'react';

const Grid: React.FC = (props) => {
    return (
        <div className="grid-container">
            {props.children}
        </div>
    )
}

export default Grid
