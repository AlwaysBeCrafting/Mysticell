import React, { useEffect, useState, useCallback } from "react";
import { Store } from "redux";
import { StoreContext } from "data/store";
import { ParentAttributes } from "common/types";
import { App } from "data/App";

interface Props extends ParentAttributes {
  store: Store;
}

const StoreProvider = (props: Props) => {
  const { children, store } = props;

  const [state, setState] = useState(new App());
  const onStateChange = useCallback(() => setState(store.getState()), [store]);

  useEffect(() => store.subscribe(onStateChange), [store]);

  return (
    <StoreContext.Provider value={[state, store.dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
