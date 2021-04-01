export namespace Monitoring {
  export enum DataTypeName {
    memory = 'memory',
    disk = 'disk',
    querie = 'querie',
    thread = 'thread',
    connection = 'connection',
  }
  export interface DataType {
    type: DataTypeName;
  }
  export interface MemoryUsage {
    committed: number;
    init: number;
    max: number;
    used: number;
  }
  export interface MemoryData extends DataType {
    type: DataTypeName.memory;
    heapMemoryUsage: MemoryUsage;
    nonHeapMemoryUsage: MemoryUsage;
    objectPendingFinalizationCount: number;
  }
  export type MonitorResult = Monitoring.DataType[];

  export type DataTypeOf<Type extends DataTypeName> =
    Type extends DataTypeName.memory ? MemoryData
    : DataType;

  export type SubscribtionCallback<Type extends DataTypeName> = (value: DataTypeOf<Type>) => void;
  export type UnsubscribeCallback = () => void;
}