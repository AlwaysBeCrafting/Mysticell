import * as React from "react";

import { Position } from "common/types/layout";

import "./Wire.less";


interface WireProps {
	start: Position;
	end: Position;
}


export default ( props: WireProps ) => {
	const { start, end } = props;
	const center = {
		x: ( start.x + end.x ) / 2,
		y: ( start.y + end.y ) / 2,
	};

	return <path className="wire" d={
		`M ${ start.x  },${ start.y } ` +
		`C ${ center.x },${ start.y } ` +
		`  ${ center.x },${ end.y   } ` +
		`  ${ end.x    },${ end.y   } ` }/>;
};
