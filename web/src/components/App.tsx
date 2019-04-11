import React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "redux";

import { AppDragLayer } from "components/organisms";
import {
  ConnectedDocumentPage,
  ConnectedHomePage,
  NotFoundPage,
} from "components/pages";

import { App as AppModel } from "data/App";

import "./App.scss";

interface Props {
  store: Store<AppModel>;
}

const App = hot(({ store }: Props) => (
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <>
        <AppDragLayer />
        <Router>
          <Switch>
            <Route exact path="/" component={ConnectedHomePage} />
            <Route path="/d/:documentId" component={ConnectedDocumentPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </>
    </DragDropContextProvider>
  </Provider>
));

export { App };
