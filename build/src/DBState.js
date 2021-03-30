import React, {useState} from "../_snowpack/pkg/react.js";
import StateWidget from "./StateWidget.js";
const DBState = (props) => {
  const style = {
    gridArea: props.gridArea
  };
  const [state, setState] = useState({
    queries: 103,
    activeThreads: 2,
    nbrConnections: 10,
    waitingThreads: 0
  });
  return /* @__PURE__ */ React.createElement("div", {
    style
  }, /* @__PURE__ */ React.createElement("div", {
    className: "db-state"
  }, /* @__PURE__ */ React.createElement(StateWidget, {
    state: "danger",
    title: "running queries",
    value: state.queries
  }), /* @__PURE__ */ React.createElement(StateWidget, {
    state: "healthy",
    title: "active threads",
    value: state.activeThreads
  }), /* @__PURE__ */ React.createElement(StateWidget, {
    state: "healthy",
    title: "number of connections",
    value: state.nbrConnections
  }), /* @__PURE__ */ React.createElement(StateWidget, {
    state: "warnning",
    title: "waiting threads",
    value: state.waitingThreads
  })));
};
export default DBState;
