import { applyMiddleware, createStore, Dispatch } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { App, epic, reducer } from "data/App";
import { clientEpic } from "data/client";
import { createContext, useContext } from "react";

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

const StoreContext = createContext<[App, Dispatch] | null>(null);

const useStore = () => {
  const value = useContext(StoreContext);
  if (value === null) {
    throw new Error("No StoreProvider found in hierarchy");
  }
  return value;
};

export { configureStore, StoreContext, useStore };
