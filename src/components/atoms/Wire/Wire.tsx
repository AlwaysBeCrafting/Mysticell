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
		`M ${ startPos.x * 40 },${ startPos.y  * 40 + 20 } ` +
		`C ${ center.x   * 40 },${ startPos.y  * 40 + 20 } ` +
		`  ${ center.x   * 40 },${ endPos.y    * 40 + 20 } ` +
		`  ${ endPos.x   * 40 },${ endPos.y    * 40 + 20 } `
	);

	return (
		<path { ...attrs } className={ classNames( 'wire', className ) } d={ pathString }/>
	);
};
