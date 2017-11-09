import { Action as CommonAction } from "./actions";
import { Action as GraphAction } from "./Graph";
export type Action = CommonAction | GraphAction;
export {
  addCard,
  removeCard,
  placeCard,
  connectNodes,
  setInputValueAsync,
} from "./Graph";

export {
  GraphCardTemplate,
  FunctionCardTemplate,
  PropertyCardTemplate,
  isFunction,
  isGraph,
  isProperty,
  BoundaryNodeValue,
  CardNodeValue,
  NodeValue,
  gridWidth,
  nodePosition,
} from "./Graph";
export { PrimitiveCardTemplate, isPrimitive, PRIMITIVES } from "./Primitive";
export { TableCardTemplate, isTable } from "./Table";
export { CardTemplate } from "./model";

export { CardTemplateJs } from "./js";

export { reducer } from "./reducer";

export { epic } from "./epic";
