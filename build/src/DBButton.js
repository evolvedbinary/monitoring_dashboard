import React from "../_snowpack/pkg/react.js";
const DBButton = (props) => {
  const style = {
    gridArea: props.grid
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: props.clicked ? "db-button db-button__clicked" : "db-button",
    style,
    onClick: props.onClick
  }, /* @__PURE__ */ React.createElement("h3", null, props.text), /* @__PURE__ */ React.createElement("i", {
    className: `fa fa-${props.icon}`,
    "aria-hidden": "true"
  }));
};
export default DBButton;
