/**
 * A utility function returning the passed array typed as narrowly as possible,
 * with a side-effect being that tuple literals are typed as the appropriate
 * tuple instead of as an array. Because this generates no-op JavaScript code,
 * it should be removed in favor of `... as const` once Typescript 3.4 lands.
 * https://github.com/Microsoft/TypeScript/issues/30281
 **/
const tuple = <T extends unknown[]>(...tup: T) => tup;

export { tuple };
