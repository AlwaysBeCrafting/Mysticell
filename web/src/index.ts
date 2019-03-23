import { createElement } from "react";
import { render } from "react-dom";

import { App } from "components/App";

import { configureStore } from "data/store";

const store = configureStore();
const development = process.env.NODE_ENV === "development";
const rootElem = document.querySelector(".root");

const renderRoot = () => {
  render(createElement(App, { store }), rootElem);
};

renderRoot();

if (development && module.hot) {
  module.hot.accept("components/App", renderRoot);
}
