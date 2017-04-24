import * as classNames from 'classnames';
import * as React from 'react';

import { Position } from 'common/types';

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
			{ graph.nodes.map(( nodeId ) => renderWires( props, nodeId )) }
		</svg>
	);
};


const renderWires = ( props: Props, nodeId: string ) => {
	const { nodes, layout } = props;
	const node = nodes.get( nodeId );
	const pos = layout.get( nodeId );

	if ( !node || !pos ) { return; }

	return node.inputs.map(( source, index ) => {
		const startPos = { x: 0, y: 0 };
		const endPos = {
			x: pos.x,
			y: pos.y + node.outputs.length + index + 1,
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

		return <Wire startPos={ startPos } endPos={ endPos } />;
	});
};


export { WireLayer };
export default WireLayer;
