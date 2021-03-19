import { Observable, Subject } from 'rxjs';
import { MemoryImpl } from '../data';
import { DUMMY_SERVER } from './base';

const G = 1024 * 1024 * 1024 * 1024;

const subject = new Subject<MemoryImpl>();
let done: () => void;

const monitor = {
  start() {
    // start listening to changes from the server
    done = DUMMY_SERVER((none, [
      Hcommitted,
      Hused,
      committed,
      used,
      objectPendingFinalizationCount
      ]) => {
        subject.next({
          heapMemoryUsage: {
            committed:Hcommitted,
            init:1000,
            max:64 * G,
            used: Hused
          },
          nonHeapMemoryUsage:{
            committed,
            used,
            init:1000,
            max:64 * G,
          },
          objectPendingFinalizationCount,
          verbose:true,
        });
      }, 1,
      [8 * G, 4 * G, 2 * G, 1 * G, 0],
      [64 * G, 60 * G, 8 * G, 8 * G, 8],
      [5 * G, 5 * G, 0.21 * G, 0.5 * G, 1],
    );
    return monitor;
  },
  stop() {
    // stop listening to changes from the server
    if (done) {
      done();
    }
    subject.complete();
    return monitor;
  },
  subscribe(next?: (value: MemoryImpl) => void, error?: (error: any) => void, complete?: () => void) {
    return subject.subscribe(next, error, complete);
  },
  observable: subject as Observable<MemoryImpl>,
};
export default monitor;