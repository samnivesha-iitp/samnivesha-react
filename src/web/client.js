import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

const state = JSON.parse(window.__INITIAL_STATE__);

hydrate(
  <BrowserRouter>
    <App store={state} />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
