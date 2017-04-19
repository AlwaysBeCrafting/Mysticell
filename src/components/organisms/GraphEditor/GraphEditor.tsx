import * as classNames from 'classnames';
import * as React from 'react';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import './GraphEditor.scss';


interface Props extends React.HTMLAttributes<HTMLDivElement> {}


export default ({ className, ...attrs }: Props ) => (
	<div { ...attrs } className={ classNames( 'graphEditor', className ) }>
		<Toolbar title="Editor" className="graphEditor-toolbar" />
		<div className="graphEditor-nodes">
			<div className="graphEditor-nodes-panel graphEditor-nodes-leftPanel" />
			<div className="graphEditor-nodes-grid" />
			<div className="graphEditor-nodes-panel graphEditor-nodes-rightPanel" />
		</div>
		<FAB icon="add" className="graphEditor-fab" />
	</div>
);
