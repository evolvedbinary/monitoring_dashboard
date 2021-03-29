import React from 'react'
import DBState from './DBState';
import MemoryChart from './memoryChart'
import DiskSpace from './diskSpace'
import Grid from './grid';
import DBHealth from './DBHealth';
import "./style/index.scss";
import DBActions from './DBActions';

const App = () => {
    return (
        <Grid>
            <DBState gridArea="DBState"/>
            <MemoryChart gridArea="memoryChart"/>
            <DiskSpace gridArea="diskSpace"/>
            <DBHealth gridArea="dbHealth"></DBHealth>
            <DBActions gridArea="dbActions" />
        </Grid>
    )
}

export default App
