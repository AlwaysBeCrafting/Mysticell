import * as React from 'react';

import { Position } from 'data/shared';

import './Wire.less';

interface WireProps {
	start: Position;
	end: Position;
}

const Wire = ( props: WireProps ) => {
	const { start, end } = props;

	const flip = ( start.x < end.x ) !== ( start.y < end.y );

	const style = {
		left:                    Math.min( start.x, end.x ),
		top:                     Math.min( start.y, end.y ),
		right: `calc( 100% - ${  Math.max( start.x, end.x ) }px )`,
		bottom: `calc( 100% - ${ Math.max( start.y, end.y ) }px )`,
		transform: `scaleY( ${ flip ? -1 : 1 } )`,
	};

	return <div className="wire" style={ style }>
		<svg viewBox="0 0 1 1" preserveAspectRatio="none">
			<path className="line" d="M 0,0 C 0.5,0 0.5,1 1,1"/>
		</svg>
	</div>;
};

export default Wire;
