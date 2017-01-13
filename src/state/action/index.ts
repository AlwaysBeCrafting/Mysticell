import { Position } from 'data/shared';

import { AddNodeAction } from './addNode';
import { CollapseFieldAction } from './collapseField';
import { ConnectNodesAction } from './connectNodes';
import { DisconnectNodesAction } from './disconnectNodes';
import { ExpandFieldAction } from './expandField';
import { HidePopupAction } from './hidePopup';
import { LoadDocumentAction } from './loadDocument';
import { MoveNodeAction } from './moveNode';
import { RemoveNodeAction } from './removeNode';
import { SelectNodeAction } from './selectNode';
import { SetPathAction } from './setPath';
import { SetPathToFormulaAction } from './setPathToFormula';
import { SetTitleAction } from './setTitle';
import { ShowPopupAction } from './showPopup';
import { UpdateNodeInputAction } from './updateNodeInput';

export type Action =
	AddNodeAction |
	CollapseFieldAction |
	ConnectNodesAction |
	DisconnectNodesAction |
	ExpandFieldAction |
	HidePopupAction |
	LoadDocumentAction |
	MoveNodeAction |
	RemoveNodeAction |
	SelectNodeAction |
	SetPathAction |
	SetPathToFormulaAction |
	SetTitleAction |
	ShowPopupAction |
	UpdateNodeInputAction;

export default Action;
