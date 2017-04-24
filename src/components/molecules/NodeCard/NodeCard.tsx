import React from 'react';

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


const NodeCard = ( props: Props ) => {
	return props.definition
		? renderCard( props )
		: renderError( props, `Node definition ${ props.node.definition } doesn't exist` );
};


const renderCard = ( props: Props ) => {
	const { position, node, definition } = props;
	const name = node.label || definition.name;
	const pinCount = definition.inputNames.length + definition.outputNames.length;
	return (
		<Card className="nodeCard" style={ makeStyle( position, pinCount ) }>
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


const renderError = ( props: Props, message: string ) => {
	const { position, node } = props;
	const pinRowCount = node.inputs.length + node.outputs.length;
	return (
		<Card className="nodeCard errorNodeCard" style={ makeStyle( position, pinRowCount ) }>
			<header className="nodeCard-headerRow nodeCard-row">
				<div className="nodeCard-headerRow-name">Error</div>
			</header>
			<div className="errorNodeCard-messageRow nodeCard-row">{ message }</div>
		</Card>
	);
};


const makeStyle = ( position: Position, pinRowCount: number ) => ({
	gridRow: `${ position.y + 1 } / span ${ pinRowCount + 1 }`,
	gridColumn: `${ position.x + 1 } / span 4`,
});


export { NodeCard };
export default NodeCard;
