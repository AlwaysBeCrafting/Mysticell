import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { PopupState } from "redux/reducers/popup";

import { Action } from "redux/actions";
import { hidePopup } from "redux/actions/popup";

import Fields from "./Fields";
import FormulaEditor from "./FormulaEditor";
import Playmat from "./Playmat";
import PopupComp from "./Popup";

import "./index.less";

interface EditorStateProps {
	path: string[];
	popup: PopupState;
}

interface EditorDispatchProps {
	dispatch: ( action: Action ) => void;
}

type EditorProps = EditorStateProps & EditorDispatchProps;

const Editor = ( props: EditorProps ) =>
<main id="editor" onClick={ ev => props.popup.element && props.dispatch( hidePopup() ) }>
	<div id="document-area">
		<Fields items = { [] } />
		{ props.path.length ? <FormulaEditor /> : <Playmat /> }
	</div>
	{ !!props.popup &&
		<PopupComp { ...props.popup }>
			{ props.popup.element }
		</PopupComp>
	}
</main>;

export default reduxConnect(
	({ path, popup }) => ({ path, popup }),
	( dispatch ) => ({ dispatch }),
)( Editor );
