import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Position } from 'common/types';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import { AppState } from 'data';
import { UserNode } from 'data/Node/model';

import './GraphEditor.scss';


type Layout = Map<string, Position>;


interface StateProps {
	nodes: Map<string, UserNode>;
	layout: Layout;
}

interface RouteParams { id: string; }

interface DispatchProps {}

interface PublicProps extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<RouteParams> {}

type Props = StateProps & DispatchProps & PublicProps;


const GraphEditor = ({ className, match, nodes, layout }: Props ) => {
	const node = nodes.get( `NODE-${ match.params.id }` );

	if ( !node ) {
		return (
			<div className={ classNames( 'graphEditor', 'graphEditor-error', className ) }>
				No node with ID { match.params.id }
			</div>
		);
	}

	return (
		<div className={ classNames( 'graphEditor', className ) }>
			<Toolbar title={ match.params.id } className="graphEditor-toolbar" />
			{ renderGraph( node, layout ) }
			<FAB icon="add" className="graphEditor-fab" />
		</div>
	);
};


const renderGraph = ( node: UserNode, layout: Layout ) => {
	return (
		<div className="graphEditor-graph">
			<div className="graphEditor-graph-panel graphEditor-graph-leftPanel" />
			{ renderGrid( node, layout ) }
			<div className="graphEditor-graph-panel graphEditor-graph-rightPanel" />
		</div>
	);
};


const renderGrid = ( node: UserNode, layout: Layout ) => {
	const members = node.definition.entries();
	return (
		<div className="graphEditor-graph-grid">
		{ members.toString() }
		{ layout.toString() }
		</div>
	);
};


export { RouteParams };
export default connect<StateProps, DispatchProps, PublicProps>(
	({ document: { nodes, layout }}: AppState ) => ({ nodes, layout }),
)( GraphEditor );
