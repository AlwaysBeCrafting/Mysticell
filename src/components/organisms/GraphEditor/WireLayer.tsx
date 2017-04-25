import classNames from 'classnames';
import React from 'react';

import { Position } from 'common/types';
import { layoutGridWidth } from 'common/util';

import { Wire } from 'components/atoms';

import { Graph } from 'data/Graph/model';
import { Node } from 'data/Node/model';


interface Props {
	graph: Graph;
	nodes: Map<string, Node>;
	layout: Map<string, Position>;
}


const WireLayer = ( props: Props & React.HTMLAttributes<SVGElement> ) => {
	const { graph, className } = props;

	return (
		<svg className={ classNames( 'wireLayer', className ) }>
			{ graph.nodes.map(( nodeId ) => renderNodeWires( props, nodeId )) }
			{ renderOutputWires( props ) }
		</svg>
	);
};


const renderNodeWires = ( props: Props, nodeId: string ) => {
	const { nodes, layout } = props;
	const node = nodes.get( nodeId );
	const pos = layout.get( nodeId );

	if ( !node || !pos ) { return; }

	const indexOffset = 1 + node.outputs.length;

	return node.inputs.map( mapSourceToWire( indexOffset, pos, layout, node.id ));
};

const renderOutputWires = ( props: Props ) => {
	const { graph, layout } = props;
	const position: Position = { x: layoutGridWidth( layout ), y: 0 };
	return graph.outputs.map( mapSourceToWire( 1, position, layout, 'GRAPH' ));
};

const mapSourceToWire = ( indexOffset: number, pos: Position, layout: Map<string, Position>, key: string ) => (
	( source, index ) => {
		const startPos = { x: 0, y: 0 };
		const endPos = {
			x: pos.x,
			y: pos.y + index + indexOffset,
		};
		switch ( source.type ) {
			case 'graph':
				startPos.x = 0;
				startPos.y = source.index + 1;
				break;

			case 'node':
				const sourcePosition = layout.get( source.id );
				if ( !sourcePosition ) { return; }

				startPos.x = sourcePosition.x + 4;
				startPos.y = sourcePosition.y + source.index + 1;
				break;

			default: return;
		}

		return <Wire startPos={ startPos } endPos={ endPos } key={ `${ key }/${ index }` } />;
	}
);


export { WireLayer };
export default WireLayer;
