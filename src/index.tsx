import React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import exampleDoc from "common/assets/exampleDoc.json";

import { EditorPage } from "components/pages";

import { loadDocument } from "data/Document";

import { configureStore } from "store";

import "index.scss";

const store = configureStore();
store.dispatch(loadDocument(exampleDoc));

const rootElem = document.querySelector(".root");

const renderRoot = () => {
  const editor = (
    <Provider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <EditorPage />
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
