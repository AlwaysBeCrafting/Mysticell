import * as classNames from 'classnames';
import * as React from 'react';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import './GraphEditor.scss';


interface Props extends React.HTMLAttributes<HTMLDivElement> {}


export default ({ className, ...attrs }: Props ) => (
	<div { ...attrs } className={ classNames( 'graphEditor', className ) }>
		<Toolbar title="Editor" />
		<FAB icon="add" />
	</div>
);
