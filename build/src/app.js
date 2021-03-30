import React, {useState} from "../_snowpack/pkg/react.js";
import DBState from "./DBState.js";
import MemoryChart from "./memoryChart.js";
import DiskSpace from "./diskSpace.js";
import Grid from "./grid.js";
import DBHealth from "./DBHealth.js";
import "./style/index.css.proxy.js";
import DBActions from "./DBActions.js";
import {DBContext} from "./DBConext.js";
const App = () => {
  const [monitor, setMonitor] = useState({pause: false, trace: false});
  return /* @__PURE__ */ React.createElement(Grid, null, /* @__PURE__ */ React.createElement(DBContext.Provider, {
    value: {monitor, setMonitor}
  }, /* @__PURE__ */ React.createElement(DBState, {
    gridArea: "DBState"
  }), /* @__PURE__ */ React.createElement(MemoryChart, {
    gridArea: "memoryChart"
  }), /* @__PURE__ */ React.createElement(DiskSpace, {
    gridArea: "diskSpace"
  }), /* @__PURE__ */ React.createElement(DBHealth, {
    gridArea: "dbHealth"
  }), /* @__PURE__ */ React.createElement(DBActions, {
    gridArea: "dbActions"
  })));
};
export default App;
