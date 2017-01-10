import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { PopupState } from 'state';

import Fields from './Fields';
import FormulaEditor from './FormulaEditor';
import Playmat from './Playmat';
import Popup from './Popup';

import './index.less';

export interface EditorProps {
	path: string[];
	popup?: PopupState;
}

const Editor = ( props: EditorProps ) => <main id="editor">
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
)( Editor );
