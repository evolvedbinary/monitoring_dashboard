import { Observable, Subject } from 'rxjs';
import { Database } from '../data';
import { DUMMY_SERVER } from './base';

const G = 1024 * 1024 * 1024 * 1024;

const subject = new Subject<Database>();
let done: () => void;

const monitor = {
  start() {
    // start listening to changes from the server
    done = DUMMY_SERVER((uptime, [
        reservedMem,
        activeBrokers,
        totalBrokers,
        collectionCacheMem,
        otherCacheMem,
      ]) => {
        subject.next({
          activeBrokers,
          availableBrokers: totalBrokers - activeBrokers,
          cacheMem: collectionCacheMem + otherCacheMem,
          collectionCacheMem,
          maxBrokers: 50,
          totalBrokers,
          uptime,
          existHome: '/exist',
          instanceId: 'exist',
          reservedMem,
          status: 'OPERATIONAL',
        });
      }, 5,
      [8 * G, 0, 15, 0, 0],
      [64 * G, 10, 30, 8 * G, 8 * G],
      [0.5 * G, 2, 3, 5, 0.5 * G, 0.5 * G],
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
  subscribe(next?: (value: Database) => void, error?: (error: any) => void, complete?: () => void) {
    return subject.subscribe(next, error, complete);
  },
  observable: subject as Observable<Database>,
};
export default monitor;