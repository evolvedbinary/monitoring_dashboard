import * as React from 'react';
import List from './List';

const RecentQueries = () => {
    return (
        <div className="RecentQueries">
            <List list={[]} icon="fa-bar-chart-o" title="RecentQueries"  headerList={["Time","Source","Elapsed Time","Request URI"]}/>            
        </div>
    )
}

export default RecentQueries
