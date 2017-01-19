import * as nodes from "redux/actions/nodes";
import { NodeState } from "redux/state";

const initialState: Map<number, NodeState> = new Map();

export const reducer = (
	state = initialState,
	action: nodes.Actions,
): Map<number, NodeState> => state;
