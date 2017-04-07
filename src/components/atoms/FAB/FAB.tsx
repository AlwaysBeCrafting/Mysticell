import * as classNames from 'classnames';
import * as React from 'react';

import './FAB.scss';


interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	icon: string;
}


export default ({ icon, className, ...attrs }: Props ) => (
	<button { ...attrs } className={ classNames( 'fab', className ) }>
		<span className="icon">{ icon }</span>
	</button>
);
