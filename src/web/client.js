import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";

const state = JSON.parse(window.__INITIAL_STATE__);
delete window.__INITIAL_STATE__;
loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App store={state} />
    </BrowserRouter>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}
