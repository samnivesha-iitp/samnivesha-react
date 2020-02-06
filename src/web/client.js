import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faCheck, faLock,faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(faEnvelope, faCheck, faLock, fab,faExclamationTriangle);

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
