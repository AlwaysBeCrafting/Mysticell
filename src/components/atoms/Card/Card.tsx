import * as React from 'react';
import * as classNames from 'classnames';

import './Card.scss';


interface Props extends React.HTMLAttributes<HTMLDivElement> {}


export default ( props: Props ) => (
	<div className={ classNames( 'card', props.className ) }> { props } </div>
);
