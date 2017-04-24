import classNames from 'classnames';
import React from 'react';

import { Position } from 'common/types';

import { NodeCard } from 'components/molecules';

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

	let def;
	if ( node.definition.startsWith( 'PRIMITIVE-' )) {
		def = Primitives[node.definition];
	} else if ( node.definition.startsWith( 'GRAPH-' )) {
		def = graphs.get( node.definition );
	}

	return <NodeCard node={ node } position={ pos } definition={ def } key={ nodeId } />;
};


export { NodeLayer };
export default NodeLayer;
