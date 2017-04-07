import * as classNames from 'classnames';
import * as React from 'react';

import './Card.scss';


interface Props extends React.HTMLAttributes<HTMLDivElement> {}


export default ({ className, childItems, ...attrs }: Props ) => (
	<div { ...attrs } className={ classNames( 'card', className ) }>
		{ childItems }
	</div>
);
