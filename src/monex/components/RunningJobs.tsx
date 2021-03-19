import * as React from 'react';
import List from './List';

const RunningJobs = () => {
    return (
        <div className="RunningJobs">
            <List list={[["F","f","a"],["a","e","e"],["r","q","g"],["g","g","G"]]} headerList={["Action","ID","Info"]} icon="fa-cogs" title="RunningJobs"/>
        </div>
    )
}

export default RunningJobs
