import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Position } from 'common/types';

import { Toolbar } from 'components/molecules';

import { AppState } from 'data';
import { Graph } from 'data/Graph/model';
import { Node } from 'data/Node/model';

import { NodeLayer } from './NodeLayer';
import { NodeMenu } from './NodeMenu';
import { WireLayer } from './WireLayer';

import './GraphEditor.scss';


type Layout = Map<string, Position>;


interface RouteParams { id: string; }


interface StateProps {
	graph: Graph;
	nodes: Map<string, Node>;
	layout: Layout;
	renderGrid: () => JSX.Element;
}

interface DispatchProps {}

interface PublicProps extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<RouteParams> {}

type Props = StateProps & DispatchProps & PublicProps;


const GraphEditor = ( props: Props ) => {
	const { className, match, graph, renderGrid } = props;

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
			<div className="graphEditor-graph">
				<div className="graphEditor-graph-panel graphEditor-graph-leftPanel" />
				{ renderGrid() }
				<div className="graphEditor-graph-panel graphEditor-graph-rightPanel" />
			</div>
			<NodeMenu className="graphEditor-nodeMenu" onItemSelected={ () => ({}) } />
		</div>
	);
};


const mapStateToProps = ( state: AppState, ownProps?: PublicProps ): StateProps => {
	const graphId = `GRAPH-${ ownProps && ownProps.match.params.id }`;
	return {
		graph: state.document.graphs.get( graphId ) as Graph,
		nodes: state.document.nodes,
		layout: state.document.layout,
		renderGrid: () => {
			const { graphs, nodes, layout } = state.document;
			const graph = state.document.graphs.get( graphId );
			if ( !graph ) { return <div />; }
			return (
				<div className="graphEditor-graph-grid">
					<WireLayer
						graph={ graph }
						nodes={ nodes }
						layout={ layout }
						className="graphEditor-graph-grid-wires" />
					<NodeLayer
						graphs={ graphs }
						graph={ graph }
						nodes={ nodes }
						layout={ layout }
						className="graphEditor-graph-grid-nodes" />
				</div>
			);
		},
	};
};

const ConnectedGraphEditor = connect<StateProps, DispatchProps, PublicProps>(
	mapStateToProps,
)( GraphEditor );

export { RouteParams };
export default ConnectedGraphEditor;
