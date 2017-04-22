import * as classNames from 'classnames';
import * as React from 'react';

import { Position } from 'common/types';

import { ErrorCard, NodeCard } from 'components/molecules';

import { Graph } from 'data/Graph/model';
import { Primitives } from 'data/Node/constants';
import { Node } from 'data/Node/model';

import './NodeLayer.scss';


interface Props {
	graphs: Map<string, Graph>;
	graph: Graph;
	nodes: Map<string, Node>;
	layout: Map<string, Position>;
}


const NodeLayer = ( props: Props & React.HTMLAttributes<HTMLDivElement> ) => {
	const { graph, className } = props;

	return (
		<div className={ classNames( 'nodeLayer', className ) }>
			{ graph.nodes.map(( nodeId ) => renderNode( props, nodeId )) }
		</div>
	);
};


const renderNode = ( props: Props, nodeId: string ) => {
	const { graphs, nodes, layout } = props;
	const node = nodes.get( nodeId );

	if ( !node ) { throw new Error( `No node ${ nodeId } exists` ); }

	const pos = layout.get( nodeId ) || { x: 0, y: 0 };

	if ( node.definition.startsWith( 'PRIMITIVE-' )) {
		const def = Primitives[node.definition];
		return def
			? <NodeCard
				node={ node }
				position={ pos }
				definition={ def }
				key={ nodeId } />
			: <ErrorCard
				position={ pos }
				message={ `No primitive ${ node.definition } exists` }
				key={ nodeId } />;
	}

	if ( node.definition.startsWith( 'GRAPH-' )) {
		const def = graphs.get( node.definition );
		return def
			? <NodeCard
				node={ node }
				position={ pos }
				definition={ def }
				key={ nodeId } />
			: <ErrorCard
				position={ pos }
				message={ `No graph ${ node.definition } exists` }
				key={ nodeId } />;
	}

	return <ErrorCard
		position={ pos }
		message={ `Can't handle node with definition ${ node.definition }` }
		key={ nodeId } />;
};


export { NodeLayer };
export default NodeLayer;
