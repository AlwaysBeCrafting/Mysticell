import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Parent } from 'data/shared';

import AppState, { FieldState } from 'state';
import Action  from 'state/actions';
import addNode from 'state/actions/addNode';
import setPath from 'state/actions/setPath';

import FAB from 'components/common/FAB';
import Toolbar from 'components/common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';

//==============================================================================

export interface FormulaEditorProps extends React.Props<FormulaEditor> {
	// Put public-accessible props here
}

//------------------------------------------------------------------------------

interface WrappedFormulaEditorProps extends FormulaEditorProps {
	path: string[];
	rootField: Parent<number>;
	fields: Map<number, FieldState>;
	onPathClick: ( pathSegment: string[] ) => void;
	onCreateNode: ( id: number ) => void;
}

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

class FormulaEditor extends React.PureComponent<WrappedFormulaEditorProps, {}> {
	public render() {
		const { fields, path, onPathClick, onCreateNode } = this.props;
		const field = fieldAtPath( path, fields );

		return <div id="node-editor">
			<Toolbar>
				<button className="icon" onClick={ () => onPathClick( [] ) }>close</button>
				<nav className="expanding path">{
					path.map(( entry, i ) => <a
						tabIndex={ 0 }
						key={ entry }
						onClick={ () => onPathClick( path.slice( 0, i + 1 )) }>
						{ entry }</a> )
				}</nav>
				<a className="icon">undo</a>
				<a className="icon">redo</a>
			</Toolbar>
			<NodeArea fieldId={ field.id } />
			<FAB icon="add" onClick={ () => onCreateNode( field.id ) } />
		</div>;
	}
}

const ConnectedNodeEditor = reduxConnect<{}, {}, FormulaEditorProps>(
	( state: AppState ): Partial<WrappedFormulaEditorProps> => ({
		path:      state.path,
		fields:    state.fields,
	}),
	( dispatch: (action: Action) => void ): Partial<WrappedFormulaEditorProps> => ({
		onPathClick:  (path: string[]) => dispatch( setPath( path )),
		onCreateNode: (fieldId: number) => dispatch(
			addNode(
				fieldId,
				'ADD',
			),
		),
	}),
)( FormulaEditor );

export default DragDropContext( HTML5Backend )( ConnectedNodeEditor ) as React.ComponentClass<FormulaEditorProps>;
