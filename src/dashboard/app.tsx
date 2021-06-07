import React from 'react';
import Info from './info';
import State from './state';
import Grid from './grid';
import Actions from './actions';
import Health from './health';
import ActiveQueries from './activeQueries';
import DiskSpace from './diskSpace';

const App = () => {
    return (
        <Grid>
            <State gridArea="state"/>
            <Info gridArea="info"/>
            <Actions gridArea="actions"/>
            <Health gridArea="health" />
            <ActiveQueries gridArea="active-q" />
            <DiskSpace gridArea="disk" />
        </Grid>
    )
}

export default App
