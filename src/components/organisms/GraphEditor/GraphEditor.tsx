import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Position } from 'common/types';
import { layoutGridWidth } from 'common/util';

import { Toolbar } from 'components/molecules';

import { AppState } from 'data';
import { Document } from 'data/Document/model';
import { Graph } from 'data/Graph/model';
import { Node } from 'data/Node/model';

import { NodeLayer } from './NodeLayer';
import { Panel } from './Panel';
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
				<Panel type="input" pinNames={ graph.inputNames } />
				{ renderGrid() }
				<Panel type="output" pinNames={ graph.outputNames } />
			</div>
		</div>
	);
};


const renderGraphGrid = ( graphId: string, document: Document ) => () => {
	const { graphs, nodes, layout } = document;
	const graph = document.graphs.get( graphId );
	if ( !graph ) { return <div />; }

	const gridStyle = { flexBasis: 40 * layoutGridWidth( layout ) };

	return (
		<div className="graphEditor-graph-grid" style={ gridStyle }>
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
};


const ConnectedGraphEditor = connect<StateProps, DispatchProps, PublicProps>(
	( state: AppState, ownProps: PublicProps ) => {
		const graphId = `GRAPH-${ ownProps && ownProps.match.params.id }`;
		return {
			graph: state.document.graphs.get( graphId ) as Graph,
			nodes: state.document.nodes,
			layout: state.document.layout,
			renderGrid: renderGraphGrid( graphId, state.document ),
		};
	},
)( GraphEditor );


export { RouteParams };
export default ConnectedGraphEditor;
