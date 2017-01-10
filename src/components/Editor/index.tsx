import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { PopupState } from 'state';
import Action from 'state/action';
import hidePopup from 'state/action/hidePopup';

import Fields from './Fields';
import FormulaEditor from './FormulaEditor';
import Playmat from './Playmat';
import Popup from './Popup';

import './index.less';

interface EditorState {
	path: string[];
	popup?: PopupState;
}

interface EditorDispatch {
	dispatch: ( action: Action ) => void;
}

type EditorProps = EditorState & EditorDispatch;

const Editor = ( props: EditorProps ) =>
<main id="editor" onClick={ ev => props.popup && props.dispatch( hidePopup() ) }>
	<div id="document-area">
		<Fields items = { [] } />
		{ props.path.length ? <FormulaEditor /> : <Playmat /> }
	</div>
	{ !!props.popup &&
		<Popup { ...props.popup }>
			{ props.popup.element }
		</Popup>
	}
</main>;

export default reduxConnect(
	({ path, popup }) => ({ path, popup }),
	( dispatch ) => ({ dispatch }),
)( Editor );
