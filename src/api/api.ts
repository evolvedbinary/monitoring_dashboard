import { Monitoring } from "./classes";
import { DUMMY } from "./dummy";

export class MonitoringApi {
  constructor(private callback: (result: Monitoring.MonitorResult) => void) {
    console.log('api class created');
    // TODO: initialize websocket connection
  }
  request(...types: Monitoring.DataTypeName[]) {
    console.log('request from api: ' + types.join(', '));
    // TODO: make api request
    setTimeout(() => this.callback(DUMMY.multi(...types)), Math.random() * 2000);
  }
};
