import * as React from 'react';
import List from './List';

const RunningQueries = () => {
    return (
        <div className="RunningQueries">
            <List title="RunningQueries" list={[]} headerList={["Id","Source","URI","Status"]} icon={"fa-search"} />
        </div>
    )
}

export default RunningQueries;
