import classNames from "classnames";
import React from "react";
import {connect} from "react-redux";

import {Dict} from "common/types";
import {formulaLayoutWidth} from "common/util";

import {Toolbar} from "components/molecules";

import {AppState} from "data/AppState";
import {Formula} from "data/Formula/model";
import {Node} from "data/Node/model";
import {connectedInputs} from "data/utils";

import {NodeLayer} from "./NodeLayer";
import {Panel} from "./Panel";
import {WireLayer} from "./WireLayer";

import "./FormulaView.scss";


interface StateProps {
	formula: Formula;
	formulas: Dict<Formula>;
	nodes: Dict<Node>;
}

interface PublicProps {
	className?: string;
	id: string;
}

type Props = StateProps & PublicProps;

const ProtoFormulaView = (props: Props) => {
	const {className, formula, formulas, nodes} = props;

	return (
		<div className={classNames("formulaView", className)}>
			<Toolbar title={formula.name} className="formulaView-toolbar" />
			<div className="formulaView-graph">
				<Panel
					type="input"
					pinNames={formula.inputNames}
					connectedInputs={connectedInputs(formula.graph, "input")}
				/>
				{renderGrid(formula, formulas, nodes)}
				<Panel
					type="output"
					pinNames={formula.outputNames}
					connectedInputs={connectedInputs(formula.graph, "output")}
				/>
			</div>
		</div>
	);
};

const renderGrid = (formula: Formula, formulas: Dict<Formula>, nodes: Dict<Node>) => {

	const gridStyle = {flexBasis: 40 * formulaLayoutWidth(formula.layout)};

	return (
		<div className="formulaView-graph-grid" style={gridStyle}>
			<WireLayer
				className="formulaView-graph-grid-wires"
				formula={formula}
				formulas={formulas}
				nodes={nodes}
			/>
			<NodeLayer
				className="formulaView-graph-grid-nodes"
				formula={formula}
				formulas={formulas}
				nodes={nodes}
			/>
		</div>
	);
};

const FormulaView = connect<StateProps, {}, PublicProps>(
	(state: AppState, ownProps: PublicProps) => {
		return {
			formula: state.document.formulas[ownProps.id],
			formulas: state.document.formulas,
			nodes: state.document.nodes,
		};
	},
)(ProtoFormulaView);


export {FormulaView};
