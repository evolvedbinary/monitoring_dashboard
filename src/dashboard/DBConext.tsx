import {createContext, Dispatch, useState} from 'react';
import { Monitor } from './api/monitor';

export interface MonitorContext{
  monitor: Monitor;
  trace: boolean;
  pause: boolean;
};
const monitor = new Monitor('/endpoint');

export const DBContext = createContext<{
  monitorContext: MonitorContext;
  setMonitorContext: Dispatch<MonitorContext>;
}>({
  monitorContext: {
    monitor,
    trace: false,
    pause: false,
  },
  setMonitorContext: () => {}
});
