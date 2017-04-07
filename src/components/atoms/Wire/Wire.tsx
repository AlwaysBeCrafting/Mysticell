import * as classNames from 'classnames';
import * as React from 'react';

import { Position } from 'common/types/layout';

import './Wire.scss';


interface Props extends React.SVGAttributes<SVGPathElement> {
	startPos: Position;
	endPos: Position;
}


export default ({ startPos, endPos, className, ...attrs }: Props ) => {
	const center = {
		x: ( startPos.x + endPos.x ) / 2,
		y: ( startPos.y + endPos.y ) / 2,
	};

	const pathString = (
		`M ${ startPos.x },${ startPos.y } ` +
		`C ${ center.x   },${ startPos.y } ` +
		`  ${ center.x   },${ endPos.y   } ` +
		`  ${ endPos.x   },${ endPos.y   } `
	);

	return (
		<path { ...attrs } className={ classNames( 'wire', className ) } d={ pathString }/>
	);
};
