import { List, Record } from "immutable";

import { ParamFunction } from "data/common";

import { CardTemplate, CardTemplateProps } from "../model";

interface PrimitiveCardTemplateProps extends CardTemplateProps {
  evaluate: ParamFunction;
}
class PrimitiveCardTemplate extends Record<PrimitiveCardTemplateProps>({
  id: "template.primitive.00000000",
  name: "Primitive",
  inputNames: List(),
  outputNames: List(),
  evaluate: () => List(),
}) {}

const isPrimitive = (
  template: CardTemplate | undefined,
): template is PrimitiveCardTemplate =>
  !!template && template.id.startsWith("template.primitive");

export { PrimitiveCardTemplate, isPrimitive };
