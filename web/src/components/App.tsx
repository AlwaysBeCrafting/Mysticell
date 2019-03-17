import React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "redux";

import { AppDragLayer } from "components/organisms";
import { ConnectedDocumentPage } from "components/pages";

import { App as AppModel } from "data/App";

import "./App.scss";

interface Props {
  store: Store<AppModel>;
}

const App = ({ store }: Props) => (
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <>
        <AppDragLayer />
        <Router>
          <Switch>
            <Route path="/d/:documentId" component={ConnectedDocumentPage} />
          </Switch>
        </Router>
      </>
    </DragDropContextProvider>
  </Provider>
);

export { App };
