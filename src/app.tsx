import React, { useEffect, useState } from 'react'
import DBState from './DBState';
import MemoryChart from './memoryChart'
import DiskSpace from './diskSpace'
import Grid from './grid';
import DBHealth from './DBHealth';
import "./style/index.scss";
import DBActions from './DBActions';
import { DBContext } from './DBConext';
import { Monitor } from './api/monitor';
import { Monitoring } from './api/classes';
import DBButton from './DBButton';

const monitor = new Monitor('/endpoint');
const App = () => {
    const [memoryTime, $memoryTime] = useState(0);
    const [connectionTime, $connectionTime] = useState(0);
    const [memoryStop, $memoryStop] = useState<() => void>(null);
    const [connectionStop, $connectionStop] = useState<() => void>(null);
    function memoryStopListenning() {
        memoryStop();
        $memoryStop(null);
    }
    function memoryStartListenning() {
        const time = Date.now() / 1000;
        $memoryStop(() => monitor.listen(Monitoring.DataTypeName.memory, value => {
            $memoryTime(Date.now() / 1000 - time);
        }, 50));
    }
    function connectionStopListenning() {
        connectionStop();
        $connectionStop(null);
    }
    function connectionStartListenning() {
        const time = Date.now() / 1000;
        $connectionStop(() => monitor.listen(Monitoring.DataTypeName.connection, value => {
            $connectionTime(Date.now() / 1000 - time);
        }, 200));
    }

    return (
        <Grid>
            <div>
                <h1>Memory</h1>
                <h3>{memoryTime.toFixed(2)}</h3>
                <DBButton
                    text={'memory ' + (memoryStop ? 'stop' : 'start')}
                    onClick={memoryStop ? memoryStopListenning : memoryStartListenning}
                />
            </div>
            <div>
                <h1>Connection</h1>
                <h3>{connectionTime.toFixed(2)}</h3>
                <DBButton
                    text={'connection ' + (connectionStop ? 'stop' : 'start')}
                    onClick={connectionStop ? connectionStopListenning : connectionStartListenning}
                />
            </div>
        </Grid>
    )
}

export default App
