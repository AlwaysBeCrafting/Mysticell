import { Action as CellAction } from "data/Cell";
import { Action as DocumentAction } from "data/Document";
import { Action as NodeAction } from "data/Node";
import { Action as SheetAction } from "data/Sheet";
import { Action as SourceAction } from "data/Source";
import { Action as WireAction } from "data/Wire";

type Action =
  | CellAction
  | DocumentAction
  | NodeAction
  | SheetAction
  | SourceAction
  | WireAction;

export { Action };
