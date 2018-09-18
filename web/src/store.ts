import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import { App, epic, reducer } from "data/App";

const configureStore = (initialState: App = new App()) => {
  const epicMiddleware = createEpicMiddleware(epic);
  const enhancers = composeWithDevTools(applyMiddleware(epicMiddleware));
  const store = initialState
    ? createStore<App>(reducer, initialState, enhancers)
    : createStore<App>(reducer, enhancers);

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("data/App", () => {
      store.replaceReducer(reducer);
      epicMiddleware.replaceEpic(epic);
    });
  }

  return store;
};

export { configureStore };
