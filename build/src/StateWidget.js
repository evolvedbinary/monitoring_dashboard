import React from "../_snowpack/pkg/react.js";
const StateWidget = (props) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: `state-widget ${props.state}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "state-title"
  }, props.title), /* @__PURE__ */ React.createElement("div", {
    className: "state-value"
  }, props.value));
};
export default StateWidget;
