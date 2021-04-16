import * as React from 'react';
import ProgressBar from './progressBar';

const Cache = () => {
    return (
        <div  className="cache">
            <h3>Cache usage</h3>
            <ProgressBar bgcolor={"#F24C3D"} completed={50} />
            <ProgressBar bgcolor={"#F25C05"} completed={20} />
            <ProgressBar bgcolor={"#0597F2"} completed={150} />
            <ProgressBar bgcolor={"#2955D9"} completed={50} />
            <ProgressBar bgcolor={"#6a1b9a"} completed={70} />
        </div>
    )
}

export default Cache;
