import * as React from 'react';


const Grid : React.FC = (props) => {
    return (
        <div className="grid">
            {props.children}
        </div>
    )
}

export default Grid
