import * as React from 'react';

import { Position } from 'common/types';

import { Card, DestinationPinRow, SourcePinRow } from 'components/atoms';

import { Graph } from 'data/Graph/model';
import { Node, Primitive } from 'data/Node/model';

import './NodeCard.scss';


interface Props {
	position: Position;
	node: Node;
	definition: Primitive | Graph;
}


const NodeCard = ({ position, node, definition }: Props ) => {
	const rowCount = 1 + definition.inputNames.length + definition.outputNames.length;
	const name = node.label || definition.name;
	const style = {
		gridRow: `${ position.y + 1 } / span ${ rowCount }`,
		gridColumn: `${ position.x + 1 } / span 4`,
	};
	return (
		<Card className="nodeCard" style={ style }>
			<header className="nodeCard-headerRow nodeCard-row">
				<span className="nodeCard-headerRow-name">{ name }</span>
			</header>
			{ definition.outputNames.map(( outputName ) => (
				<SourcePinRow name={ outputName } key={ outputName } />
			))}
			{ definition.inputNames.map(( inputName ) => (
				<DestinationPinRow name={ inputName } key={ inputName } />
			))}
		</Card>
	);
};


export { NodeCard };
export default NodeCard;
