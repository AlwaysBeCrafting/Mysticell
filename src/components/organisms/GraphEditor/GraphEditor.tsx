import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Position } from 'common/types';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import { AppState } from 'data';
import { Graph } from 'data/Graph/model';
import { Node } from 'data/Node/model';

import { WireLayer } from './WireLayer';

import './GraphEditor.scss';


type Layout = Map<string, Position>;


interface RouteParams { id: string; }


interface StateProps {
	graph: Graph;
	nodes: Map<string, Node>;
	layout: Layout;
}

interface DispatchProps {}

interface PublicProps extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<RouteParams> {}

type Props = StateProps & DispatchProps & PublicProps;


const GraphEditor = ({ className, match, graph, nodes, layout }: Props ) => {
	if ( !graph ) {
		return (
			<div className={ classNames( 'graphEditor', 'graphEditor-error', className ) }>
				No node with ID { match.params.id }
			</div>
		);
	}

	return (
		<div className={ classNames( 'graphEditor', className ) }>
			<Toolbar title={ graph.name } className="graphEditor-toolbar" />
			{ renderGraph( graph, nodes, layout ) }
			<FAB icon="add" className="graphEditor-fab" />
		</div>
	);
};


const renderGraph = ( graph: Graph, nodes: Map<string, Node>, layout: Layout ) => {
	return (
		<div className="graphEditor-graph">
			<div className="graphEditor-graph-panel graphEditor-graph-leftPanel" />
			{ renderGrid( graph, nodes, layout ) }
			<div className="graphEditor-graph-panel graphEditor-graph-rightPanel" />
		</div>
	);
};


const renderGrid = ( graph: Graph, nodes: Map<string, Node>, layout: Layout ) => (
	<div className="graphEditor-graph-grid">
		<WireLayer graph={ graph } nodes={ nodes } layout={ layout } className="graphEditor-graph-grid-wires" />
	</div>
);


const mapStateToProps = ( state: AppState, ownProps?: PublicProps ): StateProps => {
	const graphId = `GRAPH-${ ownProps && ownProps.match.params.id }`;
	return {
		graph: state.document.graphs.get( graphId ) as Graph,
		nodes: state.document.nodes,
		layout: state.document.layout,
	};
};

const ConnectedGraphEditor = connect<StateProps, DispatchProps, PublicProps>(
	mapStateToProps,
)( GraphEditor );

export { RouteParams };
export default ConnectedGraphEditor;
