import * as React from 'react';
import { connect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Field, FieldMap } from 'data/doc';

import Action  from 'state/action';
import addNode from 'state/addNode';
import {State} from 'state/reducers';
import setPath from 'state/setPath';

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
	rootField: Field;
	fields: FieldMap;
	onPathClick: ( pathSegment: string[] ) => void;
	onCreateNode: ( id: number ) => void;
}

const fieldAtPath = ( path: string[], rootField: Field, fields: FieldMap ) => path.reduce(
	( field, childName ) => field.children
		.map( id => fields.get( id ) as Field ) // TODO: `as Field` here just masks an error, handle undefined better
		.find( child => child.name === childName ) as Field,
	rootField,
);

class FormulaEditor extends React.PureComponent<WrappedFormulaEditorProps, {}> {
	public render() {
		const { fields, rootField, path, onPathClick, onCreateNode } = this.props;
		const field = fieldAtPath( path, rootField, fields );

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
			<NodeArea formula={ field.formula } />
			<FAB icon="add" onClick={ () => onCreateNode( field._id ) } />
		</div>;
	}
}

const ConnectedNodeEditor = connect<{}, {}, FormulaEditorProps>(
	( state: State ): Partial<WrappedFormulaEditorProps> => ({
		path:      state.path,
		rootField: { children: state.doc.rootFields } as Field,
		fields:    state.doc.fields,
	}),
	( dispatch: (action: Action) => void ): Partial<WrappedFormulaEditorProps> => ({
		onPathClick:  (path: string[]) => dispatch( setPath( path )),
		onCreateNode: (fieldId: number) => dispatch( addNode( fieldId, 'ADD' )),
	}),
)( FormulaEditor );

export default DragDropContext( HTML5Backend )( ConnectedNodeEditor ) as React.ComponentClass<FormulaEditorProps>;
