import { Graph } from "filament";

import { Param } from "data/common";

import { Formula } from "./model";

const evaluate = (formula: Formula) => (...params: Param[]) => {};

export { evaluate };
