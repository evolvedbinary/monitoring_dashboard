import { Observable, Subject } from 'rxjs';
import { bufferTime, filter } from 'rxjs/operators';
import { MonitoringApi } from './api';
import { Monitoring } from './classes';
import { DUMMY } from './dummy';

export interface MonitorSubjects {
  [Monitoring.DataTypeName.connection]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.connection>>;
  [Monitoring.DataTypeName.disk]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.disk>>;
  [Monitoring.DataTypeName.memory]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.memory>>;
  [Monitoring.DataTypeName.query]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.query>>;
  [Monitoring.DataTypeName.thread]?: Subject<Monitoring.DataTypeOf<Monitoring.DataTypeName.thread>>;
}
export type MonitorIntervals = Partial<Record<Monitoring.DataTypeName, number>>;


export class Monitor {
  private api: MonitoringApi;
  private subject = new Subject<Monitoring.DataType>();
  private subSubjects: MonitorSubjects = {};
  private tickerSubject: Subject<Monitoring.DataTypeName>;
  private ticker: Observable<Monitoring.DataTypeName[]>;
  private response(result: Monitoring.MonitorResult) {
    console.log('received result:', result);
    result.forEach(subResult => {
      console.log('  forwarding sub result:', subResult.type);
      this.getSubject<any>(subResult.type).next(subResult);
    });
  }
  constructor(private endpoint: string) {
    console.log('monitor created at: ' + endpoint);
    this.api = new MonitoringApi(this.response.bind(this));
    this.tickerSubject = new Subject<Monitoring.DataTypeName>();
    this.ticker = this.tickerSubject.pipe(
      bufferTime(500),
      filter(types => types.length > 0)
    );
    this.ticker.subscribe(types => this.api.request(...types.filter((type, i) => i === types.indexOf(type))));
  }
  dispose() {
    Object.keys(this.subSubjects).map(type => this.subSubjects[type]).forEach(subject => subject.complete());
    this.subject.complete();
  }

  private getSubject<Type extends Monitoring.DataTypeName>(type: Monitoring.DataTypeName): Subject<Monitoring.DataTypeOf<Type>> {
    if (!this.subSubjects[type]) {
      this.subSubjects[type] = new Subject<any>();
    }
    return this.subSubjects[type] as unknown as Subject<Monitoring.DataTypeOf<Type>>;
  }

  async request(type: Monitoring.DataTypeName.memory): Promise<Monitoring.MemoryData>;
  async request(type: Monitoring.DataTypeName): Promise<Monitoring.DataType> {
    console.log('requested type: ' + type);
    switch (type) {
      // case Monitoring.DataTypeName.memory: return this.readMemory();
      default: return { type };
    }
  }

  listen<Type extends Monitoring.DataTypeName.thread = Monitoring.DataTypeName.thread>(
    type: Monitoring.DataTypeName.thread,
    callback: Monitoring.SubscribtionCallback<Type>,
    interval?: number,
  ): Monitoring.UnsubscribeCallback;
  listen<Type extends Monitoring.DataTypeName.query = Monitoring.DataTypeName.query>(
    type: Monitoring.DataTypeName.query,
    callback: Monitoring.SubscribtionCallback<Type>,
    interval?: number,
  ): Monitoring.UnsubscribeCallback;
  listen<Type extends Monitoring.DataTypeName.disk = Monitoring.DataTypeName.disk>(
    type: Monitoring.DataTypeName.disk,
    callback: Monitoring.SubscribtionCallback<Type>,
    interval?: number,
  ): Monitoring.UnsubscribeCallback;
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
    let intervalRef: number;
    if (interval > 0) {
      intervalRef = setInterval(() => {
        this.tickerSubject.next(type);
      }, interval);
      this.tickerSubject.next(type);
    }
    const subscription = this.getSubject<Type>(type).subscribe({
      next: callback,
    });
    return () => {
      subscription.unsubscribe();
      if (intervalRef) {
        clearInterval(intervalRef);
      }
    }
  }
}