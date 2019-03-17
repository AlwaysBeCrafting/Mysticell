import React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { Store } from "redux";

import { ConnectedDocumentPage } from "components/pages";

import { App as AppModel } from "data/App";

interface Props {
  store: Store<AppModel>;
}

const App = ({ store }: Props) => (
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <ConnectedDocumentPage documentId="document.default" />
    </DragDropContextProvider>
  </Provider>
);

export { App };
