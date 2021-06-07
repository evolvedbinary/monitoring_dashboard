import React from 'react';

const DBInfo: React.FC<{gridArea:string}> = (props) => {
    const style : React.CSSProperties = {
        gridArea : props.gridArea,
    };
    return (
        <div className="info" style={style}>
            <p>Version: 3.5.6</p>
            <p>HostName: Pineapple</p>
        </div>
    )
}

export default DBInfo
