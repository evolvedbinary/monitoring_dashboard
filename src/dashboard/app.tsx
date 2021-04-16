import * as React from 'react';
import {  useState } from 'react'
import DBState from './DBState';
import MemoryChart from './memoryChart';
import DiskSpace from './diskSpace'
import Grid from './grid';
import DBActions from './DBActions';
import { DBContext } from './DBConext';
import { Monitor } from './api/monitor';

const monitor = new Monitor('/endpoint');

const MonitoringDashboard = () => {
    const [monitorContext, setMonitorContext] = useState({
        monitor,
        trace: false,
        pause: false,
    })
    return (
        <Grid>
            <DBContext.Provider value={{ monitorContext, setMonitorContext }}>
                <DBState gridArea="DBState" />
                <DBActions gridArea="dbActions" />
                <MemoryChart gridArea="memoryChart" />
                <DiskSpace gridArea="diskSpace" />
                {/* <DBHealth gridArea="dbHealth"></DBHealth> */}
            </DBContext.Provider>
        </Grid>
    )
}

export default MonitoringDashboard
