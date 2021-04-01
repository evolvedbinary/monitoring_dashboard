import { Subject } from 'rxjs';
import { MonitoringApi } from './api';
import { randomBetween } from './base';
import { Monitoring } from './classes';
import { DUMMY } from './dummy';

export interface MonitorSubjects {
  [Monitoring.DataTypeName.connection]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.connection>>;
  [Monitoring.DataTypeName.disk]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.disk>>;
  [Monitoring.DataTypeName.memory]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.memory>>;
  [Monitoring.DataTypeName.querie]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.querie>>;
  [Monitoring.DataTypeName.thread]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.thread>>;
}
export type MonitorIntervals =  Partial<Record<Monitoring.DataTypeName, number>>;


export class Monitor {
  private api: MonitoringApi;
  private subject = new Subject<Monitoring.DataType>();
  private subSubjects: MonitorSubjects = {};
  private intervals: MonitorIntervals = {};
  private ticks: MonitorIntervals = {};
  private running = false;
  private lastTick: number;
  private nextTick: number;
  private response(result: Monitoring.MonitorResult) {
    console.log('received result:', result);
    result.forEach(subResult => {
      console.log('  forwarding sub result:', subResult.type);
      this.getSubject(subResult.type).next(subResult);
    });
  }
  constructor(private endpoint: string) {
    console.log('monitor created at: ' + endpoint);
    this.api = new MonitoringApi(this.response);
  }
  dispose() {
    Object.keys(this.subSubjects).map(type => this.subSubjects[type]).forEach(subject => subject.complete());
    this.subject.complete();
  }

  tick() {
    this.lastTick = Date.now();
    this.running = false;
    const keys = Object.keys(this.ticks) as Monitoring.DataTypeName[];
    const requests: Monitoring.DataTypeName[] = [];
    console.log('tick started for:', keys.length);
    if (keys.length) {
      const next = keys
      .map(type => {
          console.log('  - next tick for ' + type + ' is after ' + this.ticks[type].toString());
          if (this.ticks[type] <= 0) {
            console.log('    - tick ' + type + ' is due, running again after ' + this.intervals[type].toString());
            this.ticks[type] = this.intervals[type];
            requests.push(type);
          }
          return [type, this.ticks[type]] as [Monitoring.DataTypeName, number];
        })
        .sort((a, b) => {
          return a[1] - b[1];
        })
        .map((value) => {
          console.log('  - new order: ' + value[0] + ' after ' + value[1].toString());
          return value;
        })
        .find(([type, tick]) => tick > 0);
      console.log('  - set to run after: ' + next[1].toString());
      keys.forEach(type => this.ticks[type] = this.ticks[type] - next[1]);
      setTimeout(this.tick.bind(this), next[1] * 1000);
      this.nextTick = this.lastTick + 1000;
      this.running = true;
    }
  }

  private getSubject<Type extends Monitoring.DataTypeName>(type: Monitoring.DataTypeName): Subject<Monitoring.DataTypeOf<Type>> {
    if (!this.subSubjects[type]) {
      this.subSubjects[type] = new Subject<any>();
    }
    return this.subSubjects[type] as unknown as Subject<Monitoring.DataTypeOf<Type>>;
  }

  private async readMemory(): Promise<Monitoring.MemoryData> {
    return DUMMY.memory();
  }

  async request(type: Monitoring.DataTypeName.memory): Promise<Monitoring.MemoryData>;
  async request(type: Monitoring.DataTypeName): Promise<Monitoring.DataType> {
    console.log('requested type: ' + type);
    switch (type) {
      case Monitoring.DataTypeName.memory: return this.readMemory();;
      default: return { type };
    }
  }

  listen<Type extends Monitoring.DataTypeName.memory = Monitoring.DataTypeName.memory>(
    type: Monitoring.DataTypeName.memory,
    callback: Monitoring.SubscribtionCallback<Type>,
    interval?: number,
  ): Monitoring.UnsubscribeCallback;
  listen<Type extends Monitoring.DataTypeName.connection = Monitoring.DataTypeName.connection>(
    type: Monitoring.DataTypeName.connection,
    callback: Monitoring.SubscribtionCallback<Type>,
    interval?: number,
  ): Monitoring.UnsubscribeCallback;
  listen<Type extends Monitoring.DataTypeName>(
    type: Type,
    callback: Monitoring.SubscribtionCallback<Type>,
    interval = -1,
  ): Monitoring.UnsubscribeCallback {
    console.log('requested updates for type: ' + type);
    if (interval > 0) {
      this.intervals[type] = interval;
      this.ticks[type] = 0;
      if (!this.running || this.nextTick - Date.now() > 50) {
        this.tick();
      }
    }
    return this.getSubject<Type>(type).subscribe({
      next: callback,
    }).unsubscribe;
  }
}