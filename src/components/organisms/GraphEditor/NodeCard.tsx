import * as React from 'react';

import { Position } from 'common/types';

import { Card } from 'components/atoms';

import { Graph } from 'data/Graph/model';
import { Node, Primitive } from 'data/Node/model';

import './NodeCard.scss';


const InputRow = ( name: string ) => (
	<div className="nodeCard-inputRow nodeCard-row">
		{ name }
	</div>
);


const OutputRow = ( name: string ) => (
	<div className="nodeCard-outputRow nodeCard-row">
		{ name }
	</div>
);


interface Props {
	position: Position;
	node: Node;
	definition: Primitive | Graph;
}


const NodeCard = ({ position, node, definition }: Props ) => {
	const rowCount = 1 + definition.inputNames.length + definition.outputNames.length;
	const name = node.label || definition.name;
	const style = {
		gridRow: `${ position.y } / span ${ rowCount }`,
		gridColumn: `${ position.x } / span 4`,
	};
	return (
		<Card className="nodeCard" style={ style }>
			<header className="nodeCard-headerRow">
				<span className="nodeCard-headerRow-name">{ name }</span>
			</header>
			{ definition.outputNames.map( OutputRow ) }
			{ definition.inputNames.map( InputRow ) }
		</Card>
	);
};

export { NodeCard };
export default NodeCard;
