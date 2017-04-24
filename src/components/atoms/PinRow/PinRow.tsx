import classNames from 'classnames';
import React from 'react';

import './PinRow.scss';


interface Props {
	name: string;
	className?: string;
}


const PinRow = ( type: string ) => ({ name, className, ...attrs }: Props ) => (
	<div
		className={ classNames( `pinRow ${ type }PinRow`, className ) }
		key={ name }
		{ ...attrs }
	>
		<div className={ `pinRow-pin ${ type }PinRow-pin` } />
		{ name }
	</div>
);


const SourcePinRow = PinRow( 'source' );
const DestinationPinRow = PinRow( 'destination' );


export { SourcePinRow, DestinationPinRow };
