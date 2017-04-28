import classNames from 'classnames';
import React from 'react';

import { ParamSource } from 'data/common';

import './PinRow.scss';


interface Props {
	name: string;
	className?: string;
	source?: ParamSource;
}


const PinRow = ( type: string ) => ({ name, className, source, ...attrs }: Props ) => (
	<div
		className={ classNames( `pinRow ${ type }PinRow`, className ) }
		key={ name }
		{ ...attrs }
	>
		<div className={ `pinRow-pin ${ type }PinRow-pin` } />
		<label className="pinRow-label">{ name }</label>
		{
			source && source.type === 'value'
				? <input className="pinRow-value" value={ source.userValue } />
				: undefined
		}
	</div>
);


const SourcePinRow = PinRow( 'source' );
const DestinationPinRow = PinRow( 'destination' );


export { SourcePinRow, DestinationPinRow };
