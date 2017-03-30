import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";


import { Action, AppState } from "data";
import { setPath } from "data/path";
import { showPopup } from "data/popup";

import FAB from "common/components/FAB";
import Toolbar from "common/components/Toolbar";

import AddNodeMenu from "./AddNodeMenu";
import NodeArea from "./NodeArea";

import "./index.less";


interface GraphEditorStateProps {
	path: string[];
}

interface GraphEditorDispatchProps {
	dispatch: ( action: Action ) => void;
}

type GraphEditorProps = GraphEditorStateProps & GraphEditorDispatchProps;


const GraphEditor = ( props: GraphEditorProps ) => {
	const { path, dispatch } = props;

	return <div id="node-editor">
		<Toolbar>
			<button className="icon" onClick={ () => dispatch( setPath( [] ))}>close</button>
			<nav className="expanding path">{
				path.map(( entry, i ) => <a
					tabIndex={ 0 }
					key={ entry }
					onClick={ () => dispatch( setPath( path.slice( 0, i + 1 ))) }>
					{ entry }</a> )
			}</nav>
			<a className="icon">undo</a>
			<a className="icon">redo</a>
		</Toolbar>
		<NodeArea fieldId={ 0 } />
		<FAB icon="add" onClick={ ev => {
			const { right: x, bottom: y } = ev.currentTarget.getBoundingClientRect();
			dispatch( showPopup(
				<AddNodeMenu fieldId={ 0 } />,
				{ x, y },
				{ horizontal: "right", vertical: "bottom" },
			));
		}} />
	</div>;
};


const DragDropGraphEditor = DragDropContext( HTML5Backend )( GraphEditor );


const mapStateToProps = ( state: AppState ): GraphEditorStateProps => ({
	path:   state.path,
});
const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): GraphEditorDispatchProps => ({
	dispatch,
});
export default reduxConnect<{}, {}, {}>(
	mapStateToProps,
	mapDispatchToProps,
)( DragDropGraphEditor );
