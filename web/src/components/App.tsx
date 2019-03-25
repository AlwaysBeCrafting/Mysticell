import React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "redux";

import { StoreContextProvider } from "common/hooks";
import { AppDragLayer } from "components/organisms";
import { DocumentPage, HomePage, NotFoundPage } from "components/pages";
import { App as AppModel } from "data/App";

import "./App.scss";

interface Props {
  store: Store<AppModel>;
}

const App = hot(({ store }: Props) => {
  return (
    <StoreContextProvider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <>
          <AppDragLayer />
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/d/:documentId" component={DocumentPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </>
      </DragDropContextProvider>
    </StoreContextProvider>
  );
});

export { App };
