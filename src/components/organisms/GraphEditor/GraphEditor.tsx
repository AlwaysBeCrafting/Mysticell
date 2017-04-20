import * as classNames from 'classnames';
import * as React from 'react';
import { match } from 'react-router';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import './GraphEditor.scss';


export interface RouteParams {
	id: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	match: match<RouteParams>;
}


const GraphEditor = ({ className, match, ...attrs }: Props ) => (
	<div { ...attrs } className={ classNames( 'graphEditor', className ) }>
		<Toolbar title={ match.params.id } className="graphEditor-toolbar" />
		<div className="graphEditor-graph">
			<div className="graphEditor-graph-panel graphEditor-graph-leftPanel" />
			<div className="graphEditor-graph-grid" />
			<div className="graphEditor-graph-panel graphEditor-graph-rightPanel" />
		</div>
		<FAB icon="add" className="graphEditor-fab" />
	</div>
);


export { GraphEditor };
export default GraphEditor;
