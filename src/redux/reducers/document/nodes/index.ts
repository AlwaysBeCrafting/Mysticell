import { combineReducers } from "redux";

import { Node } from "data";

import { reducer as reduceNodes } from "./nodes";
import { reducer as reduceSelection } from "./selection";

export interface NodeState {
	nodes: Map<number, Node>;
	selection: number[];
}

export const reducer = combineReducers<NodeState>({
	nodes: reduceNodes,
	selection: reduceSelection,
});
