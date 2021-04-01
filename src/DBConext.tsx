import {createContext, Dispatch} from 'react';
import { Monitor } from './api/monitor';

export interface MonitorContext{
  monitor: Monitor;
  trace: boolean;
  pause: boolean;
};
export const DBContext = createContext<{
  monitorContext: MonitorContext;
  setMonitorContext: Dispatch<MonitorContext>;
}>(null);
