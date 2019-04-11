import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { App, epic, reducer } from "data/App";
import { clientEpic } from "data/client";

const rootEpic = combineEpics(epic, clientEpic);

const configureStore = (initialState: App = new App()) => {
  const epicMiddleware = createEpicMiddleware();

  const enhancers = composeWithDevTools(applyMiddleware(epicMiddleware));
  const store = initialState
    ? createStore(reducer, initialState, enhancers)
    : createStore(reducer, enhancers);

  epicMiddleware.run(rootEpic);

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("data/App", () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
};

export { configureStore };
