import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import { AppState } from 'data';
import { Node } from 'data/Node/model';

import './GraphEditor.scss';


export interface RouteParams {
	id: string;
}

interface PublicProps extends React.HTMLAttributes<HTMLDivElement> {
	match: match<RouteParams>;
}

interface StateProps {
	nodes: Map<string, Node>;
}

interface DispatchProps {}

type Props = StateProps & DispatchProps & PublicProps;


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


export default connect<StateProps, DispatchProps, PublicProps>(
	( state: AppState ) => ({ nodes: state.document.nodes }),
)( GraphEditor );
