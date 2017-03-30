import * as React from "react";

import { connect as reduxConnect } from "react-redux";

import { Action } from "data";
import { hidePopup, PopupState } from "data/popup";

import PopupComp from "common/components/Popup";

import GraphEditor from "../GraphEditor";
import Playmat from "./Playmat";

import "./index.less";


interface EditorStateProps {
	path: string[];
	popup: PopupState;
}

interface EditorDispatchProps {
	dispatch: ( action: Action ) => void;
}

type EditorProps = EditorStateProps & EditorDispatchProps;


const Editor = ( props: EditorProps ) => (
	<main id="editor" onClick={ ev => props.popup.element && props.dispatch( hidePopup() ) }>
		<div id="document-area">
			{ props.path.length ? <GraphEditor /> : <Playmat /> }
		</div>
		{ !!props.popup &&
			<PopupComp { ...props.popup }>
				{ props.popup.element }
			</PopupComp>
		}
	</main>
);


export default reduxConnect(
	({ path, popup }) => ({ path, popup }),
	( dispatch ) => ({ dispatch }),
)( Editor );
