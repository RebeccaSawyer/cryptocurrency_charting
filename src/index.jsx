import { hot } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("app"));

const renderApp = () => {
  ReactDOM.hydrate(<App />, document.getElementById("app"));
};

if (module.hot) {
  module.hot.accept("./components/App", () => renderApp());
}
