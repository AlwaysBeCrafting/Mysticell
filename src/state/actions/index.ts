import { Position } from 'data/shared';

import { AddNodeAction } from './addNode';
import { CollapseFieldAction } from './collapseField';
import { ConnectNodesAction } from './connectNodes';
import { ExpandFieldAction } from './expandField';
import { LoadDocumentAction } from './loadDocument';
import { MoveNodeAction } from './moveNode';
import { SetPathAction } from './setPath';
import { SetPathToFormulaAction } from './setPathToFormula';
import { SetTitleAction } from './setTitle';

export type Action =
	AddNodeAction |
	CollapseFieldAction |
	ConnectNodesAction |
	ExpandFieldAction |
	LoadDocumentAction |
	MoveNodeAction |
	SetPathAction |
	SetPathToFormulaAction |
	SetTitleAction;

export default Action;
