import { List, Map } from "immutable";

import { Param, ParamType } from "data/common";
import { Source } from "data/Source";

const asNumber = (identity = 0) => (param: Param) =>
  typeof param === "number" ? param : identity;

const asError = (type: ParamType = "number") => (param: Param): Error => {
  if (typeof param === "object") {
    return param;
  }
  const err = new Error(`Expected ${type}, got ${typeof param}`);
  err.name = "TYPE";
  return err;
};

type Operator = (...nums: number[]) => number;

const verifyAndReduce = (
  params: List<Param>,
  identity: number,
  op: Operator,
): List<Param> => {
  const convParams = params.map(param => {
    if (typeof param === "number") {
      return asNumber(identity)(param);
    } else {
      return asError()(param);
    }
  });
  const error = params.find(param => typeof param === "object");
  if (error) {
    return List.of(error);
  }
  return List.of(op(...(convParams as List<number>)));
};

const PRIMITIVE_SOURCES = List.of(
  new Source({
    id: "primitive.noop",
    path: "/No-op",
    inputs: List.of({ name: "In", type: "undefined" as ParamType }),
    outputs: List.of({ name: "Out", type: "undefined" as ParamType }),
  }),

  new Source({
    id: "primitive.add",
    path: "/Add",
    inputs: List.of(
      { name: "A", type: "number" as ParamType },
      { name: "B", type: "number" as ParamType },
    ),
    outputs: List.of({ name: "Sum", type: "number" as ParamType }),
  }),

  new Source({
    id: "primitive.subtract",
    path: "/Subtract",
    inputs: List.of(
      { name: "A", type: "number" as ParamType },
      { name: "B", type: "number" as ParamType },
    ),
    outputs: List.of({ name: "Difference", type: "number" as ParamType }),
  }),

  new Source({
    id: "primitive.multiply",
    path: "/Multiply",
    inputs: List.of(
      { name: "A", type: "number" as ParamType },
      { name: "B", type: "number" as ParamType },
    ),
    outputs: List.of({ name: "Product", type: "number" as ParamType }),
  }),

  new Source({
    id: "primitive.divide",
    path: "/Divide",
    inputs: List.of(
      { name: "A", type: "number" as ParamType },
      { name: "B", type: "number" as ParamType },
    ),
    outputs: List.of({ name: "Quotient", type: "number" as ParamType }),
  }),

  new Source({
    id: "primitive.floor",
    path: "/Floor",
    inputs: List.of({ name: "Num", type: "number" as ParamType }),
    outputs: List.of({ name: "Floor", type: "number" as ParamType }),
  }),
)
  .toMap()
  .mapKeys((_, template) => template.id);

const PRIMITIVE_FUNCTIONS = Map({
  "primitive.noop": (params: List<Param>) => params,

  "primitive.add": (params: List<Param>) =>
    verifyAndReduce(params, 0, (x, y) => x + y),

  "primitive.subtract": (params: List<Param>) =>
    verifyAndReduce(params, 0, (x, y) => x - y),

  "primitive.multiply": (params: List<Param>) =>
    verifyAndReduce(params, 1, (x, y) => x * y),

  "primitive.divide": (params: List<Param>) =>
    verifyAndReduce(params, 1, (x, y) => x / y),

  "primitive.floor": (params: List<Param>) =>
    verifyAndReduce(params, 0, Math.floor),
});

export { PRIMITIVE_SOURCES, PRIMITIVE_FUNCTIONS };
