import React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import { ConnectedDocumentPage } from "components/pages";

import { configureStore } from "data/store";

import "index.scss";

const store = configureStore();
const rootElem = document.querySelector(".root");

const renderRoot = () => {
  const editor = (
    <Provider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <ConnectedDocumentPage documentId="document.default" />
      </DragDropContextProvider>
    </Provider>
  );
  ReactDOM.render(
    process.env.NODE_ENV === "development" ? (
      <AppContainer>{editor}</AppContainer>
    ) : (
      editor
    ),
    rootElem,
  );
};

renderRoot();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("components/pages", renderRoot);
}
