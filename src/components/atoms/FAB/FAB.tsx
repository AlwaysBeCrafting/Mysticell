import * as React from 'react';

import './FAB.scss';


interface Props {
	icon: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}


export default ( props: Props ) => (
	<button className="fab" onClick={ props.onClick }>
		<span className="icon">{ props.icon }</span>
	</button>
);
