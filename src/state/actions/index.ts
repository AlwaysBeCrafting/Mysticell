import { Position } from 'data/shared';

import { AddNodeAction } from './addNode';
import { CollapseFieldAction } from './collapseField';
import { ExpandFieldAction } from './expandField';
import { LoadDocumentAction } from './loadDocument';
import { MoveNodeAction } from './moveNode';
import { SetPathAction } from './setPath';
import { SetTitleAction } from './setTitle';

export type Action =
	AddNodeAction |
	CollapseFieldAction |
	ExpandFieldAction |
	LoadDocumentAction |
	MoveNodeAction |
	SetPathAction |
	SetTitleAction;

export default Action;
