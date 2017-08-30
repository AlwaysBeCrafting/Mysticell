import React from 'react';

import { params } from 'data/common';

import { PinRow } from 'components/atoms/PinRow';


interface Props {
	pinNames: string[];
	type: 'input' | 'output';
}


const Panel = ( props: Props ) => {
	const { pinNames, type } = props;

	return (
		<div className={ `graphEditor-graph-panel graphEditor-graph-${ type }Panel` }>
			<div className={ `graphEditor-graph-panel-heading graphEditor-graph-${ type }Panel-heading` }>
				{ type }
			</div>
			{ pinNames.map(( name ) => (
				type === 'input'
					? (
						<PinRow
							name={ name }
							type="src"
							computedValue={ params.string( '' ) }
							key={ name }
						/>
					)
					: (
						<PinRow
							name={ name }
							type="dst"
							isConnected={ false }
							userValue={ '' }
							key={ name }
						/>
					)
			))}
		</div>
	);
};


export { Panel };
export default Panel;
