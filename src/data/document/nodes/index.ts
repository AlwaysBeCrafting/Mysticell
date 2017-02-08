import { combineReducers } from "redux";

import { Node } from "common/types";

import collection, { Action as CollectionAction } from "./collection";
import selection, { Action as SelectionAction } from "./selection";


export interface NodeState {
	collection: Map<number, Node>;
	selection: number[];
}


export type Action = CollectionAction | SelectionAction;


export default combineReducers<NodeState>({
	collection,
	selection,
});
