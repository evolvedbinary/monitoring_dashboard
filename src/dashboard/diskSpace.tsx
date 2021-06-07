import React from 'react';
import Doughnut from './doughnut';

const DiskSpace : React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    };

    return (
        <div className="disk-space" style={style}>
            <h3>Disk Space</h3>
            <div className="chart">
                <Doughnut value={40}/>
            </div>
        </div>
    )
}

export default DiskSpace
