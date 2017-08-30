import classNames from 'classnames';
import React from 'react';

import { IdMap } from 'common/types';

import { NodeCard } from 'components/molecules';

import { Formula } from 'data/Formula/model';
import { Node } from 'data/Node/model';
import { PRIMITIVES } from 'data/Primitive/constants';

import './NodeLayer.scss';


interface Props {
	formula: Formula;
	formulas: IdMap<Formula>;
	nodes: IdMap<Node>;
	className?: string;
}

const NodeLayer = ( props: Props ) => {
	const { formula, className } = props;
	const formulaNodes = Object.keys( formula.layout );

	return (
		<div className={ classNames( 'nodeLayer', className ) }>
			{ formulaNodes.map( renderNode( props )) }
		</div>
	);
};

const renderNode = ( props: Props ) => ( nodeId: string ) => {
	const { formula, formulas, nodes } = props;
	const node = nodes[nodeId];

	if ( !node ) { throw new Error( `No node ${ nodeId } exists` ); }

	const position = formula.layout[nodeId] || [ 0, 0 ];
	const nodeFunction = formulas[node.function] || PRIMITIVES[node.function];

	return (
		<NodeCard
			node={ node }
			position={ position }
			nodeFunction={ nodeFunction }
			key={ nodeId }
		/>
	);
};


export { NodeLayer };
