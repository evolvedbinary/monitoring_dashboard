import {Subject} from "../../_snowpack/pkg/rxjs.js";
import {DUMMY_SERVER} from "./base.js";
const G = 1024 * 1024 * 1024 * 1024;
const subject = new Subject();
let done;
const monitor = {
  start() {
    done = DUMMY_SERVER((none, [
      Hcommitted,
      Hused,
      committed,
      used,
      objectPendingFinalizationCount
    ]) => {
      subject.next({
        heapMemoryUsage: {
          committed: Hcommitted,
          init: 1e3,
          max: 64 * G,
          used: Hused
        },
        nonHeapMemoryUsage: {
          committed,
          used,
          init: 1e3,
          max: 64 * G
        },
        objectPendingFinalizationCount,
        verbose: true
      });
    }, 1, [8 * G, 4 * G, 2 * G, 1 * G, 0], [64 * G, 60 * G, 8 * G, 8 * G, 8], [5 * G, 5 * G, 0.21 * G, 0.5 * G, 1]);
    return monitor;
  },
  stop() {
    if (done) {
      done();
    }
    subject.complete();
    return monitor;
  },
  subscribe(next, error, complete) {
    return subject.subscribe(next, error, complete);
  },
  observable: subject
};
export default monitor;
