import {Subject} from "../../_snowpack/pkg/rxjs.js";
import {DUMMY_SERVER} from "./base.js";
const G = 1024 * 1024 * 1024 * 1024;
const subject = new Subject();
let done;
const monitor = {
  start() {
    done = DUMMY_SERVER((uptime, [
      reservedMem,
      activeBrokers,
      totalBrokers,
      collectionCacheMem,
      otherCacheMem
    ]) => {
      subject.next({
        activeBrokers,
        availableBrokers: totalBrokers - activeBrokers,
        cacheMem: collectionCacheMem + otherCacheMem,
        collectionCacheMem,
        maxBrokers: 50,
        totalBrokers,
        uptime,
        existHome: "/exist",
        instanceId: "exist",
        reservedMem,
        status: "OPERATIONAL"
      });
    }, 5, [8 * G, 0, 15, 0, 0], [64 * G, 10, 30, 8 * G, 8 * G], [0.5 * G, 2, 3, 5, 0.5 * G, 0.5 * G]);
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
