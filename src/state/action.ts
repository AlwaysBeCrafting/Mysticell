import { Position } from 'data/shared';

export interface AddNodeAction {
	type: 'ADD_NODE';
	fieldId: number;
	nodeId: number;
	fxn: string;
}

export interface CollapseFieldAction {
	type: 'COLLAPSE_FIELD';
	fieldId: number;
}

export interface ExpandFieldAction {
	type: 'EXPAND_FIELD';
	fieldId: number;
}

export interface MoveNodeAction {
	type: 'MOVE_NODE';
	nodeId: number;
	position: Position;
}

export interface SetPathAction {
	type: 'SET_PATH';
	path: string[];
}

export interface SetTitleAction {
	type: 'SET_TITLE';
	title: string;
}

export type Action = AddNodeAction  | CollapseFieldAction | ExpandFieldAction |
					MoveNodeAction | SetPathAction | SetTitleAction;

export default Action;
