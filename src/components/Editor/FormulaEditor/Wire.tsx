import * as React from 'react';

import { Position } from 'data/shared';

import './Wire.less';

interface WireProps {
	start: Position;
	end: Position;
}

const Wire = ( props: WireProps ) => {
	const { start, end } = props;
	const center = {
		x: ( start.x + end.x ) / 2,
		y: ( start.y + end.y ) / 2,
	};

	// return <path className="wire" d="M 0,0 C 0.5,0 0.5,1 1,1"/>;
	return <path className="wire" d={
		`M ${ start.x  },${ start.y } ` +
		`C ${ center.x },${ start.y } ` +
		`  ${ center.x },${ end.y   } ` +
		`  ${ end.x    },${ end.y   } ` }/>;
};

export default Wire;
