import * as React from 'react';

import { Position } from 'common/types';

import { Card } from 'components/atoms';

import './ErrorCard.scss';


interface Props {
	position: Position;
	message: string;
}


const ErrorCard = ({ position, message }: Props ) => {
	const style = {
		gridRow: `${ position.y + 1 } / span 3`,
		gridColumn: `${ position.x + 1 } / span 4`,
	};
	return (
		<Card className="errorCard" style={ style }>
			<header className="errorCard-headerRow">Error</header>
			<div className="errorCard-messageRow">{ message }</div>
		</Card>
	);
};


export { ErrorCard };
export default ErrorCard;
