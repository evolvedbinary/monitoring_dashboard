export namespace Monitoring {
  export enum DataTypeName {
    memory = 'memory',
    disk = 'disk',
    query = 'querie',
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
  export interface ConnectionData extends DataType {
    type: DataTypeName.connection;
    active: number;
  }
  export interface DiskData extends DataType {
    type: DataTypeName.disk;
    usage: number;
  }
  export interface QueryData extends DataType {
    type: DataTypeName.query;
    running: number;
  }
  export interface ThreadData extends DataType {
    type: DataTypeName.thread;
    active: number;
    waiting: number;
  }

  export type MonitorResult = Monitoring.DataType[];

  export type DataTypeOf<Type extends DataTypeName> =
    Type extends DataTypeName.memory ? MemoryData :
    Type extends DataTypeName.connection ? ConnectionData :
    Type extends DataTypeName.disk ? DiskData :
    Type extends DataTypeName.query ? QueryData :
    Type extends DataTypeName.thread ? ThreadData :
      DataType;

  export type SubscribtionCallback<Type extends DataTypeName> = (value: DataTypeOf<Type>) => void;
  export type UnsubscribeCallback = () => void;
}