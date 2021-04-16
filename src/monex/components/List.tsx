import * as React from 'react'

interface List {
    list:string[][];
    title:string;
    headerList:string[];
    icon?:string;
}

const List: React.FC<List> = (props) => {
    return (
        <div className={`${props.title}--list`}>
            <h3>{props.icon? <i className={`fa ${props.icon}`} aria-hidden="true"></i> : null} {props.title}</h3>
            <div className={`${props.title}--element ${props.title}--header`}>
                {props.headerList.map(h => <span>{h}</span>)}
            </div>
            {props.list.length ? props.list.map((l:string[]) => <div className={`${props.title}--element`}>
                {l.map((e:string) => <span>{e}</span>)}
            </div>) : "Empty"}
        </div>
    )
}

export default List;
