import { Position } from 'data/shared';

import { AddNodeAction } from './addNode';
import { CollapseFieldAction } from './collapseField';
import { MoveNodeAction } from './moveNode';

export interface ExpandFieldAction {
	type: 'EXPAND_FIELD';
	fieldId: number;
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
