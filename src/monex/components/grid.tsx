import * as React from 'react'
import GeneralInfo from './generalInfo';
import LineChart from './lineChart';
import RunningJobs from './RunningJobs';
import Cache from './cache';
import SystemInformation from './SystemInformation';
import RunningQueries from './RunningQueries';
import RecentQueries from './RecentQueries';
import WaitingThreads from './WaitingThreads';
import ActiveThreads from './ActiveThreads'

const Grid = () => {
    return (
        <div className="grid">
            <GeneralInfo></GeneralInfo>
            <RunningJobs/>
            <LineChart stepSize={1} width="inherit" height="90" title="java memory"></LineChart>
            <Cache/>
            <SystemInformation/>
            <RunningQueries/>
            <RecentQueries/>
            <WaitingThreads/>
            <ActiveThreads/>
        </div>
    )
}

export default Grid
