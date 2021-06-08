import React from 'react';

const colorScheme = ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'];

const Legend = () => {
    return (
        <>
            <div className="color-scheme">
                <span>0</span>
                {colorScheme.map((color, idx) => {
                    return (
                        <span key={idx} className="color-block" style={{ background: color }}></span>
                    );
                })}
                <span>100%</span>
            </div>
            <p>cache size: XX MB</p>
            <p>collection cache: XX MB</p>
        </>
    )
}

interface CacheProps {
    hits: number,
    misses: number,
    size: number,
    totalSize: number,
    name:string
}

const Cache : React.FC<CacheProps> = (props) => {
    const total = props.hits + props.misses;
    const hitRatio = ((props.hits / total) * 100).toFixed(1);
    const sizeRatio = props.size / props.totalSize * 100;
    const hitColor = colorScheme[Math.ceil(+hitRatio / 10) -1] || colorScheme[colorScheme.length - 1];
    const sizeColor = colorScheme[Math.ceil(+sizeRatio / 10)] || colorScheme[colorScheme.length - 1] ;
    const hitTextColor = Math.ceil(+hitRatio / 10) -1 > 4 ? "var(--theia-foreground)" : "#403a39";
    const sizeTextColor = Math.ceil(+sizeRatio / 10) > 4 ? "var(--theia-foreground)" : "#403a39";
    
    return (
        <div className="column">
            <span className="square" style={{background:sizeColor,color:sizeTextColor}}>
                {props.size}
                <div className="popup">
                    {props.size} of {props.totalSize}
                </div>
            </span>
            <span className="square" style={{background:hitColor,color:hitTextColor}}>
                {hitRatio}
                <div className="popup">
                    <p>
                        {props.hits} hits
                    </p>
                    <p>
                        {props.misses} misses
                    </p>
                </div>
            </span>
            <span>{props.name}</span>
        </div>
    );
}

const HeatMap = () => {
    return (
        <div className="heatmap">
            {/* label */}
            <div className="column">
                <span>used (MB)</span>
                <span>hit ratio (%)</span>
            </div>
            <Cache name="DOM" size={96} totalSize={96} hits={100221} misses={174}/>
            <Cache name="Structure" size={216} totalSize={216} hits={5} misses={297}/>
            <Cache name="Collections" size={21} totalSize={64} hits={51041} misses={1}/>
            <Cache name="Values" size={20} totalSize={64} hits={2312} misses={1}/>
        </div>
    );
}


const Caches : React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }
    return (
        <div style={style}>
            <h3>Caches</h3>
            <HeatMap />
            <Legend />
        </div>
    )
}

export default Caches