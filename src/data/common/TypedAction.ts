interface TypedAction<T> {
  readonly type: T;
  payload?: {};
}

export { TypedAction };
