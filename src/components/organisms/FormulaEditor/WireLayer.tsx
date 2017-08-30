import classNames from 'classnames';
import React from 'react';

import { formulaLayoutWidth } from 'common/util';

import { Wire } from 'components/atoms';

import { Formula } from 'data/Formula/model';


const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

interface Props {
	formula: Formula;
}

const WireLayer = ( props: Props & React.HTMLAttributes<SVGElement> ) => {
	const { formula, className } = props;
	const render = renderWithProps( props );
	return (
		<svg className={ classNames( 'wireLayer', className ) }>
			{ Object.keys( formula.graph ).map( render ) }
		</svg>
	);
};

const renderWithProps = ( props: Props ) => (
	( srcId: string ) => renderFromSrc( props, srcId )
);

const renderFromSrc = ( props: Props, srcId: string ) => {
	const render = ( dstId: string ) => renderToDst( props, srcId, dstId );
	const src = props.formula.graph[srcId];
	return Object.keys( src ).map( render );
};

const renderToDst = ( props: Props, srcId: string, dstId: string ) => {
	const render = ( indices: [ number, number ]) => renderWire( props, srcId, dstId, indices );
	const dst = props.formula.graph[srcId][dstId];
	return dst.map( render );
};

const renderWire = ( props: Props, srcId: string, dstId: string, indices: [ number, number ] ) => {
	const { layout } = props.formula;

	const srcPos = layout[srcId] || [ 0, 0 ];
	const dstPos = layout[dstId] || [ formulaLayoutWidth( layout ), 0 ];

	if ( srcId === 'graph' ) {
		srcPos[1] += panelHeaderRows;
	} else {
		srcPos[0] += nodeWidth;
		srcPos[1] += nodeHeaderRows;
	}
	srcPos[1] += indices[0];
	dstPos[1] += indices[1];

	return (
		<Wire
			srcPos={ srcPos }
			dstPos={ dstPos }
			key={ `${ srcId }@${ indices[0] }-${ dstId }@${ indices[1] }` }
		/>
	);
};


export { WireLayer };
export default WireLayer;
