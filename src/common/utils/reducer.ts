import { Reducer } from "redux";

function composeReducers<T>(...reducers: Array<Reducer<T>>): Reducer<T> {
  const revReducers = reducers.reverse();
  return (state: T, action: any) => {
    let newState: T = state;
    for (const reducer of revReducers) {
      newState = reducer(newState, action);
    }
    return newState;
  };
}

export { composeReducers };
