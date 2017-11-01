import { List, Map } from "immutable";

const immutablize = (input: any) => {
  const output = { ...input };
  for (const [key, value] of Object.entries(output)) {
    if (value instanceof Array) {
      output[key] = List(value);
    } else if (typeof value === "object" && value != null) {
      output[key] = Map(immutablize(value));
    }
  }
  return output;
};

export { immutablize };
