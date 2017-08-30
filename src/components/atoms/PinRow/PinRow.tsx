import classNames from 'classnames';
import React from 'react';

import { Param } from 'data/common';

import './PinRow.scss';


interface AlwaysProps {
	name: string;
	className?: string;
}

interface SrcProps extends AlwaysProps {
	type: 'src';
	computedValue: Param;
}

interface ConnectedProps extends AlwaysProps {
	type: 'dst';
	isConnected: true;
	param: Param;
}

interface DisconnectedProps extends AlwaysProps {
	type: 'dst';
	isConnected: false;
	userValue: string;
}

type DstProps = ConnectedProps | DisconnectedProps;

type Props = SrcProps | DstProps;

const PinRow = ( props: Props ) => {
	const { type, className } = props;
	return (
		<div
			className={ classNames( `pinRow ${ type }PinRow`, className ) }
			key={ name }
		>
			<div className={ `pinRow-pin ${ type }PinRow-pin` } />
			<label className="pinRow-label">{ name }</label>
			{
				props.type === 'dst'
					&& !props.isConnected
					&& <input className="pinRow-value" value={ props.userValue } />
			}
		</div>
	);
};


export { PinRow };
