import React, {useContext} from "../_snowpack/pkg/react.js";
import DBButton from "./DBButton.js";
import {DBContext} from "./DBConext.js";
const DBActions = (props) => {
  const {monitor, setMonitor} = useContext(DBContext);
  const style = {
    gridArea: props.gridArea
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "db-actions",
    style
  }, /* @__PURE__ */ React.createElement(DBButton, {
    icon: "search",
    grid: "trace",
    text: "trace",
    clicked: monitor.trace,
    onClick: () => setMonitor({pause: monitor.pause, trace: !monitor.trace})
  }), /* @__PURE__ */ React.createElement(DBButton, {
    icon: "pause",
    grid: "pause",
    text: "pause",
    clicked: monitor.pause,
    onClick: () => setMonitor({pause: !monitor.pause, trace: monitor.trace})
  }), /* @__PURE__ */ React.createElement(DBButton, {
    icon: "bolt",
    grid: "clear",
    text: "clear grabage",
    clicked: false
  }));
};
export default DBActions;
