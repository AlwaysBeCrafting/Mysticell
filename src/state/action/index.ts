import { Position } from 'data/shared';

import { AddNodeAction } from './addNode';
import { CollapseFieldAction } from './collapseField';
import { ConnectNodesAction } from './connectNodes';
import { DisconnectNodesAction } from './disconnectNodes';
import { ExpandFieldAction } from './expandField';
import { LoadDocumentAction } from './loadDocument';
import { MoveNodeAction } from './moveNode';
import { SelectNodeAction } from './selectNode';
import { SetPathAction } from './setPath';
import { SetPathToFormulaAction } from './setPathToFormula';
import { SetTitleAction } from './setTitle';

export type Action =
	AddNodeAction |
	CollapseFieldAction |
	ConnectNodesAction |
	DisconnectNodesAction |
	ExpandFieldAction |
	LoadDocumentAction |
	MoveNodeAction |
	SelectNodeAction |
	SetPathAction |
	SetPathToFormulaAction |
	SetTitleAction;

export default Action;
