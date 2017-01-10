import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Parent } from 'data/shared';

import AppState, { FieldState } from 'state';
import Action  from 'state/action';
import setPath from 'state/action/setPath';
import showPopup from 'state/action/showPopup';

import FAB from 'components/common/FAB';
import Toolbar from 'components/common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';

//==============================================================================

interface FormulaEditorState {
	path: string[];
	fields: Map<number, FieldState>;
}

interface FormulaEditorDispatcher {
	dispatch: ( action: Action ) => void;
}

type FormulaEditorProps = FormulaEditorState & FormulaEditorDispatcher;

//------------------------------------------------------------------------------

// TODO investigate how to reduce casting (lots of 'as FieldState' feels dirty)
const fieldAtPath = ( path: string[], fields: Map<number, FieldState> ): FieldState => {
	return path.reduce(
		( field, childName ) => field.children
			.map( childId => fields.get( childId ))
			.find( child => !!child && child.name === childName ) as FieldState,

		{
			children: Array.from( fields )
				.filter(([ id, field ]) => !field.parent )
				.map(([ id, field ]) => id ),
		} as FieldState,
	);
};

const FormulaEditor = ( props: FormulaEditorProps ) => {
	const { fields, path, dispatch } = props;
	const field = fieldAtPath( path, fields );

	return <div id="node-editor">
		<Toolbar>
			<button className="icon" onClick={ () => dispatch( setPath( [] )) }>close</button>
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
		<NodeArea fieldId={ field.id } />
		<FAB icon="add" onClick={ ev => {
			const { top: x, bottom: y } = ev.currentTarget.getBoundingClientRect();
			dispatch( showPopup(
				<div>Pop-up</div>,
				{ x, y },
				{ horizontal: 'right', vertical: 'bottom'},
			));
		}} />
	</div>;
};

const DragDropFormulaEditor = DragDropContext( HTML5Backend )( FormulaEditor );

const mapStateToProps = ( state: AppState ): FormulaEditorState => ({
	path:      state.path,
	fields:    state.fields,
});

const mapDispatchToProps = ( dispatch: (action: Action) => void ): FormulaEditorDispatcher => ({
	dispatch,
});

export default reduxConnect<{}, {}, {}>(
	mapStateToProps,
	mapDispatchToProps,
)( DragDropFormulaEditor );
