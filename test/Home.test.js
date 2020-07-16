import React, { useState } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Home from "shared/pages/Home";
import { AuthContext } from "shared/components/authContext";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should be Home", () => {
  act(() => {
    render(<Home />, container);
  });
});
