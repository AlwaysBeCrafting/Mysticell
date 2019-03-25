import React, { createContext, useContext } from "react";
import { Store, Dispatch } from "redux";

import { tuple } from "./utils";

const StoreContext = createContext<[unknown, Dispatch] | null>(null);

interface ContextProps<S> extends JSX.ElementChildrenAttribute {
  store: Store<S>;
}
const StoreContextProvider = <S extends unknown>({
  store,
  children,
}: ContextProps<S>) => (
  <StoreContext.Provider value={tuple(store.getState(), store.dispatch)}>
    {children}
  </StoreContext.Provider>
);

const useStore = <S extends unknown>() => {
  const ctx = useContext(StoreContext);
  if (ctx === null) {
    throw new Error("No store provider found in hierarchy");
  }
  const [state, dispatch] = ctx;
  return tuple(state as S, dispatch, StoreContext.Provider);
};

export { StoreContextProvider, useStore };
