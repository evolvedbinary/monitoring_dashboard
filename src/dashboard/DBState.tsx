import React from 'react';


const State: React.FC<{title:string,value:number,state:string}> = (props) => {
    return (
        <div className={`state ${props.state}`}>
            <span className="title">{props.title}</span>
            <span className="value">{props.value}</span>
        </div>
    );
}

const DBState = () => {
    return (
        <div className="dbState">
            <State state="healthy" title="Running" value={88}/>
            <State state="warning" title="Waiting" value={88}/>
            <State state="danger" title="Connections" value={88}/>
            <State state="healthy" title="Transactions" value={88}/>
        </div>
    )
}

export default DBState
