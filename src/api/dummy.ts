import { randomBetween } from "./base";
import { Monitoring } from "./classes";

// placeholder data and settings
const _G = 1024 * 1024 * 1024 * 1024;

const _initialMemory = 4 * _G;
const _maxMemory = 64 * _G;

const _minUsed = 1 * _G;
const _minCommitted = 2 * _G;
const _minUsedHeap = 4 * _G;
const _minCommittedHeap = 8 * _G;
const _minPending = 0;

const _maxUsed = 8 * _G;
const _maxCommitted = 8 * _G;
const _maxUsedHeap = 60 * _G;
const _maxCommittedHeap = _maxMemory;
const _maxPending = 8;

const _minConnections = 0;
const _maxConnections = 100;
const _minActiveThreads = 0;
const _maxActiveThreads = 100;
const _minWaitingThreads = 0;
const _maxWaitingThreads = 200;
const _minQueries = 0;
const _maxQueries = 100;
const _minDiskUsage = 24 * _G;
const _maxDiskUsage = 64 * _G;

export const DUMMY = {
  query: (): Monitoring.QueryData => ({
    type: Monitoring.DataTypeName.query,
    running: randomBetween(_minQueries, _maxQueries),
  }),
  thread: (): Monitoring.ThreadData => ({
    type: Monitoring.DataTypeName.thread,
    active: randomBetween(_minActiveThreads, _maxActiveThreads),
    waiting: randomBetween(_minWaitingThreads, _maxWaitingThreads),
  }),
  disk: (): Monitoring.DiskData => ({
    type: Monitoring.DataTypeName.disk,
    usage: randomBetween(_minDiskUsage, _maxDiskUsage),
  }),
  connection: (): Monitoring.ConnectionData => ({
    type: Monitoring.DataTypeName.connection,
    active: randomBetween(_minConnections, _maxConnections),
  }),
  memory: (): Monitoring.MemoryData => ({
    type: Monitoring.DataTypeName.memory,
    heapMemoryUsage: {
      committed: randomBetween(_minCommittedHeap, _maxCommittedHeap),
      max: _maxMemory,
      init: _initialMemory,
      used: randomBetween(_minUsedHeap, _maxUsedHeap),
    },
    nonHeapMemoryUsage: {
      committed: randomBetween(_minCommitted, _maxCommitted),
      max: _maxMemory,
      init: _initialMemory,
      used: randomBetween(_minUsed, _maxUsed),
    },
    objectPendingFinalizationCount: randomBetween(_minPending, _maxPending)
  }),
  get(type: Monitoring.DataTypeName): Monitoring.DataType {
    switch (type) {
      case Monitoring.DataTypeName.memory: return DUMMY.memory();
      case Monitoring.DataTypeName.connection: return DUMMY.connection();
      case Monitoring.DataTypeName.disk: return DUMMY.disk();
      case Monitoring.DataTypeName.query: return DUMMY.query();
      case Monitoring.DataTypeName.thread: return DUMMY.thread();
      default: return { type };
    }
  },
  multi(...types: Monitoring.DataTypeName[]): Monitoring.MonitorResult {
    return types.map(DUMMY.get);
  },
}

export const DUMMY_CONSTS = {
  _G,
  _initialMemory,
  _maxMemory,
  _minUsed,
  _minCommitted,
  _minUsedHeap,
  _minCommittedHeap,
  _minPending,
  _maxUsed,
  _maxCommitted,
  _maxUsedHeap,
  _maxCommittedHeap,
  _maxPending,
  _minConnections,
  _maxConnections,
  _minActiveThreads,
  _maxActiveThreads,
  _minWaitingThreads,
  _maxWaitingThreads,
  _minQueries,
  _maxQueries,
  _minDiskUsage,
  _maxDiskUsage,
}