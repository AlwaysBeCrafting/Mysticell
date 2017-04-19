import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import './GraphEditor.scss';


export interface RouteParams {
	id: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<RouteParams> {}


export default ({ className, match, ...attrs }: Props ) => (
	<div { ...attrs } className={ classNames( 'graphEditor', className ) }>
		<Toolbar title={ match.params.id } className="graphEditor-toolbar" />
		<div className="graphEditor-nodes">
			<div className="graphEditor-nodes-panel graphEditor-nodes-leftPanel" />
			<div className="graphEditor-nodes-grid" />
			<div className="graphEditor-nodes-panel graphEditor-nodes-rightPanel" />
		</div>
		<FAB icon="add" className="graphEditor-fab" />
	</div>
);
