import * as React from 'react';
import classNames from 'classnames';

import './FAB.scss';


interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	icon: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}


export default ( props: Props ) => (
	<button className={ classNames( 'fab', props.className ) } onClick={ props.onClick }>
		<span className="icon">{ props.icon }</span>
	</button>
);
