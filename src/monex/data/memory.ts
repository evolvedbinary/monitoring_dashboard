export interface HeapMemoryUsage {
  committed: number;
  init: number;
  max: number;
  used: number;
}

export interface NonHeapMemoryUsage {
  committed: number;
  init: number;
  max: number;
  used: number;
}

export interface MemoryImpl {
  objectPendingFinalizationCount: number;
  heapMemoryUsage: HeapMemoryUsage;
  nonHeapMemoryUsage: NonHeapMemoryUsage;
  verbose: boolean;
}