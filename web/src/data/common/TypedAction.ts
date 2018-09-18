interface TypedAction<T> {
  readonly type: T;
}

interface AsyncAction<T, P> extends TypedAction<T> {
  readonly promise: Promise<P>;
}

export { TypedAction, AsyncAction };
