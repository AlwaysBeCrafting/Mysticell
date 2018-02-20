import { hash } from "immutable";

const hashAll = (...values: any[]): number => {
  let result = 17;
  for (const value of values) {
    result = result * 37 + hash(value);
  }
  return result;
};

export { hashAll };
