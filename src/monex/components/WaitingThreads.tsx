import * as React from 'react';
import List from './List'

const  WaitingThreads = () => {
    return (
        <div className="WaitingThreads">
            <List title="WaitingThreads" headerList={["Resource","Waiting for"]} list={[]} icon="fa-lock" />
        </div>
    )
}

export default  WaitingThreads
