import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { match as Match } from 'react-router';

import { IdMap } from 'common/types';
import { formulaLayoutWidth } from 'common/util';

import { Toolbar } from 'components/molecules';

import { AppState } from 'data';
import { Formula } from 'data/Formula/model';
import { Node } from 'data/Node/model';

import { NodeLayer } from './NodeLayer';
import { Panel } from './Panel';
import { WireLayer } from './WireLayer';

import './FormulaEditor.scss';


interface RouteParams { id: string; }

interface StateProps {
	formula: Formula;
	formulas: IdMap<Formula>;
	nodes: IdMap<Node>;
}

interface DispatchProps {}

interface PublicProps {
	className?: string;
	match: Match<RouteParams>;
}

type Props = StateProps & DispatchProps & PublicProps;

const GraphEditor = ( props: Props ) => {
	const { className, formula, formulas, nodes } = props;

	return (
		<div className={ classNames( 'graphEditor', className ) }>
			<Toolbar title={ formula.name } className="graphEditor-toolbar" />
			<div className="graphEditor-graph">
				<Panel type="input" pinNames={ formula.inputNames } />
				{ renderGrid( formula, formulas, nodes ) }
				<Panel type="output" pinNames={ formula.outputNames } />
			</div>
		</div>
	);
};

const renderGrid = ( formula: Formula, formulas: IdMap<Formula>, nodes: IdMap<Node> ) => {

	const gridStyle = { flexBasis: 40 * formulaLayoutWidth( formula.layout ) };

	return (
		<div className="graphEditor-graph-grid" style={ gridStyle }>
			<WireLayer
				className="graphEditor-graph-grid-wires"
				formula={ formula }
			/>
			<NodeLayer
				className="graphEditor-graph-grid-nodes"
				formula={ formula }
				formulas={ formulas }
				nodes={ nodes }
			/>
		</div>
	);
};

const ConnectedGraphEditor = connect<StateProps, DispatchProps, PublicProps>(
	( state: AppState, ownProps: PublicProps ) => {
		const formulaId = `FORMULA-${ ownProps && ownProps.match.params.id }`;
		return {
			formula: state.document.formulas[formulaId],
			formulas: state.document.formulas,
			nodes: state.document.nodes,
		};
	},
)( GraphEditor );


export { RouteParams };
export default ConnectedGraphEditor;
