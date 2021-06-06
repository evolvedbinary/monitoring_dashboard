import * as React from 'react';
import {  useState } from 'react'
import DBState from './DBState';
import MemoryChart from './memoryChart';
import DiskSpace from './diskSpace'
import Grid from './grid';
import DBActions from './DBActions';
import { DBContext } from './DBContext';
import { Monitor } from './api/monitor';
import System from './system';
import DBHealth from './DBHealth';
import Profiling from './profiling';
import Info from './info';
import Caches from './caches';
import ActiveQueries from './activeQueries';
import History from './history';
import TPSGraph from './tpsGraph';
import NumberOfConnectionsGraph from './nbrOfConnectionsGraph';
import ActiveQueriesGraph from './activeQueriesGraph';

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
                <Info gridArea="info"/>
                <DBState gridArea="DBState" />
                <DBActions gridArea="dbActions" />
                <MemoryChart gridArea="memoryChart" />
                <DiskSpace gridArea="diskSpace" />
                <DBHealth gridArea="dbHealth" />
                <Profiling gridArea="profiling" />
                <System gridArea="system"/>
                <Caches gridArea="cache" />
                <ActiveQueries gridArea="activeQueries"/>
                <History gridArea="history" />
                <TPSGraph gridArea="tpsGraph"/>
                <NumberOfConnectionsGraph gridArea="nbrofcGraph"/>
                <ActiveQueriesGraph gridArea="aqGraph"/>
            </DBContext.Provider>
        </Grid>
    )
}

export default MonitoringDashboard
