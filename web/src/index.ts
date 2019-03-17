import { createElement } from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import { App } from "components/App";

import { configureStore } from "data/store";

const store = configureStore();
const development = process.env.NODE_ENV === "development";
const rootElem = document.querySelector(".root");

const renderRoot = () => {
  const root = createElement(App, { store });
  if (development) {
    render(createElement(AppContainer, null, root), rootElem);
  } else {
    render(root, rootElem);
  }
};

renderRoot();

if (development && module.hot) {
  module.hot.accept("components/App", renderRoot);
}
