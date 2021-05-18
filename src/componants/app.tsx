import React, { useEffect, useRef } from 'react';
import './style.scss';

const style : React.CSSProperties = {
    padding:"1rem",
    margin:"2rem",
    border:"5px solid #ccc",
}

const Legend = () => {
    const colors = ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858'];
    return (
        <div className="color-scheme">
            {colors.map((color,idx) => {
                return(
                    <span className="color-block" style={{background:color,color:"#000"}}>{(idx+1)*10 + " %"}</span>
                );
            })}
        </div>
    )
}

const HeatMap = () => {
    return(
        <div className="heatmap">
                {/* label */}
                <div className="column">
                    <span>used (mb)</span>
                    <span>Hits</span>
                    <span></span>
                </div>
                {/* first cache */}
                <div className="column">
                    <span  className="square">100</span>
                    <span className="square">50%</span>
                    <span>DOM</span>
                </div>
                {/* second cache */}
                <div className="column">
                    <span  className="square">100</span>
                    <span className="square">50%</span>
                    <span>Starcure</span>
                </div>
                <div className="legend">
                    <span><Legend /></span>
                </div>
            </div>
    );
}

const App = () => {


    return (
        <div style={style}>
            <HeatMap/>
        </div>
    )
}

export default App
