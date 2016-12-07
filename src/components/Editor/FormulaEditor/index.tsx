import * as React from 'react';
import { connect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {Field, FieldMap} from 'data/doc';

import addNode from 'state/addNode';
import setPath from 'state/setPath';

import FAB from 'components/common/FAB';
import Toolbar from 'components/common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';

export interface FormulaEditorProps extends React.Props<FormulaEditor> {
	path?: string[];
	rootField?: Field;
	fields?: FieldMap;
	onPathClick?: (pathSegment: string[]) => void;
	onCreateNode?: (id: number) => void;
}

const fieldAtPath = ( path: string[], rootField: Field, fields: FieldMap ) => path.reduce(
	( field, childName ) => field.children
		.map( id => fields[id] )
		.find( child => child.name === childName ) as Field,
	rootField,
);

class FormulaEditor extends React.PureComponent<FormulaEditorProps, {}> {
	public render() {
		const fields = this.props.fields || {};
		const rootField = this.props.rootField || {} as Field;
		const path = this.props.path || [];
		const onPathClick = this.props.onPathClick || (() => { /* Ignore click */ });
		const onCreateNode = this.props.onCreateNode || (() => { /* Ignore node creation */ });

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
	state => ({
		path:      state.path,
		rootField: { children: state.doc.rootFields },
		fields:    state.doc.fields,
	}),
	dispatch => ({
		onPathClick:  (path: string[]) => dispatch( setPath( path )),
		onCreateNode: (fieldId: number) => dispatch( addNode( fieldId, 'ADD' )),
	}),
)( FormulaEditor );

export default DragDropContext( HTML5Backend )( ConnectedNodeEditor ) as React.ComponentClass<FormulaEditorProps>;
