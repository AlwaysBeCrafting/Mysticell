import * as React from 'react';

import { Position } from 'common/types';

import { Card } from 'components/atoms';

import { Node } from 'data/Node/model';

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
}


const NodeCard = ({ position, node }: Props ) => {
	const rowCount = 1 + node.inputNames.length + node.outputNames.length;
	const style = {
		gridRow: `${ position.y } / span ${ rowCount }`,
		gridColumn: `${ position.x } / span 4`,
	};
	return (
		<Card className="nodeCard" style={ style }>
			<header className="nodeCard-headerRow">
				<span className="nodeCard-headerRow-name">{ node.name }</span>
			</header>
			{ node.outputNames.map( OutputRow ) }
			{ node.inputNames.map( InputRow ) }
		</Card>
	);
};

export { NodeCard };
export default NodeCard;
