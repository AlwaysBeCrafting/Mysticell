import { Position } from 'data/shared';

export interface AddNodeAction {
	type: 'ADD_NODE';
	fieldId: number;
	fxn: string;
}

export interface CollapseFieldAction {
	type: 'COLLAPSE_FIELD';
	id: number;
}

export interface ExpandFieldAction {
	type: 'EXPAND_FIELD';
	id: number;
}

export interface MoveNodeAction {
	type: 'MOVE_NODE';
	id: number;
	position: Position;
}

export interface SetPathAction {
	type: 'SET_PATH';
	path: string[];
}

export type Action = AddNodeAction  | CollapseFieldAction | ExpandFieldAction |
					MoveNodeAction | SetPathAction;

export default Action;
