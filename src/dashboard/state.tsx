import React from 'react';


const State: React.FC<{title:string,value:number,state:string,info?:string}> = (props) => {
    return (
        <div className={`state ${props.state}`}>
            <span className="title">{props.title}</span>
            <span className="value">{props.value}</span>
            {props.info && 
                <span className="popup">{props.info}</span>
            }
        </div>
    );
}

const DBState: React.FC<{gridArea:string}> = (props) => {
    const style : React.CSSProperties = {
        gridArea : props.gridArea,
    };

    return (
        <div className="dbState" style={style}>
            <State state="healthy" title="Running" value={88} info="Running Queries"/>
            <State state="warning" title="Waiting" value={88}/>
            <State state="danger" title="Connections" value={88}/>
            <State state="healthy" title="Transactions" value={88}/>
        </div>
    )
}

export default DBState
