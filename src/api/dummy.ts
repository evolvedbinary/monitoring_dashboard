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

const _deltaUsed = 0.5 * _G;
const _deltaCommitted = 0.21 * _G;
const _deltaUsedHeap = 5 * _G;
const _deltaCommittedHeap = 5 * _G;
const _deltaPending = 1;

export const DUMMY = {
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
    }
  },
  multi(...types: Monitoring.DataTypeName[]): Monitoring.MonitorResult {
    return types.map(DUMMY.get);
  },
}