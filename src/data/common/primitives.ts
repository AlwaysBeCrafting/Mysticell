import { List } from "immutable";

import { Dict } from "common/types";

import { Param, PARAMS } from "data/common";
import { PrimitiveNodePrototype } from "data/NodePrototype";

const padEmpty = (params: List<Param>, length: number) =>
  params.setSize(length).map(p => p || PARAMS.empty());

const paramToNumber = (identity: number) => (param: Param): Param => {
  switch (param.type) {
    case "empty": {
      return PARAMS.number(identity);
    }
    case "string": {
      if (!param.value.trim().length) {
        return PARAMS.number(identity);
      }
      const converted = +param.value;
      if (!Number.isNaN(converted)) {
        return PARAMS.number(converted);
      }
      break;
    }
    case "error":
    case "number": {
      return param;
    }
  }
  return PARAMS.error("TYPE", `Number expected, got ${param.type}`);
};

type Operator = (...nums: number[]) => number;

const verifyAndReduce = (
  params: List<Param>,
  identity: number,
  op: Operator,
): List<Param> => {
  const convParams = params.map(paramToNumber(identity));
  const error = convParams.find(param => param.type === "error");
  if (error) {
    return List([error]);
  }
  const result = op(...convParams.map(param => param.value as number));
  return List([PARAMS.number(result)]);
};

const add = new PrimitiveNodePrototype({
  id: "primitive.add",
  name: "Add",
  inputNames: List(["A", "B"]),
  outputNames: List(["Sum"]),
  evaluate: (params: List<Param>) =>
    verifyAndReduce(padEmpty(params, 2), 0, (x, y) => x + y),
});

const subtract = new PrimitiveNodePrototype({
  id: "primitive.subtract",
  name: "Subtract",
  inputNames: List(["A", "B"]),
  outputNames: List(["Difference"]),
  evaluate: (params: List<Param>) =>
    verifyAndReduce(padEmpty(params, 2), 0, (x, y) => x - y),
});

const multiply = new PrimitiveNodePrototype({
  id: "primitive.multiply",
  name: "Multiply",
  inputNames: List(["A", "B"]),
  outputNames: List(["Product"]),
  evaluate: (params: List<Param>) =>
    verifyAndReduce(padEmpty(params, 2), 1, (x, y) => x * y),
});

const divide = new PrimitiveNodePrototype({
  id: "primitive.divide",
  name: "Divide",
  inputNames: List(["A", "B"]),
  outputNames: List(["Quotient"]),
  evaluate: (params: List<Param>) =>
    verifyAndReduce(padEmpty(params, 2), 1, (x, y) => x / y),
});

const floor = new PrimitiveNodePrototype({
  id: "primitive.floor",
  name: "Floor",
  inputNames: List(["Num"]),
  outputNames: List(["Floor"]),
  evaluate: (params: List<Param>) =>
    verifyAndReduce(padEmpty(params, 1), 0, Math.floor),
});

const primitives = { add, subtract, multiply, divide, floor };

const PRIMITIVES: Dict<PrimitiveNodePrototype> = Object.values(
  primitives,
).reduce(
  (prior, value) => ({
    ...prior,
    [value.id]: value,
  }),
  {},
);

export { primitives, PRIMITIVES };
