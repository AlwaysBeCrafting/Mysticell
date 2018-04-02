import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import { AppState, epic as appStateEpic, reducer } from "data/AppState";

const configureStore = (initialState: AppState = new AppState()) => {
  const epicMiddleware = createEpicMiddleware(appStateEpic);
  const enhancers = composeWithDevTools(applyMiddleware(epicMiddleware));
  const store = initialState
    ? createStore<AppState>(reducer, initialState, enhancers)
    : createStore<AppState>(reducer, enhancers);

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("data/AppState", () => {
      store.replaceReducer(reducer);
      epicMiddleware.replaceEpic(appStateEpic);
    });
  }

  return store;
};

export { configureStore };
