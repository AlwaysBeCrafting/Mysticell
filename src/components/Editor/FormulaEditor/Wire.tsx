import * as React from 'react';

import { Position } from 'data/shared';

import './Wire.less';

interface WireProps {
	start: Position;
	end: Position;
}

const Wire = ( props: WireProps ) => {
	const style = {
		left: props.start.x,
		top: props.start.y,
		right: `calc( 100% - ${ props.end.x }px )`,
		bottom: `calc( 100% - ${ props.end.y }px )`,
	};

	return <div className="wire" style={ style }>
		<svg viewBox="0 0 1 1" preserveAspectRatio="none">
			<path className="line" d="M 0,0 C 0.5,0 0.5,1 1,1"/>
		</svg>
	</div>;
};

export default Wire;
