import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { Dict } from "common/types";
import { formulaLayoutWidth } from "common/utils";

import { Icon, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { Formula } from "data/Formula/model";
import { Node } from "data/Node/model";
import { connectedInputs } from "data/utils";

import { NodeLayer } from "./NodeLayer";
import { Panel } from "./Panel";
import { WireLayer } from "./WireLayer";

import "./FormulaView.scss";


interface StateProps {
	formulas: Dict<Formula>;
	nodes: Dict<Node>;
}
interface OwnProps {
	className?: string;
	path: string[];
	formula: Formula;
}
type Props =
	& StateProps
	& OwnProps;

const ProtoFormulaView = (props: Props) => {
	const { className, path, formula, formulas, nodes } = props;
	return (
		<div className={classNames("formulaView", className)}>
			<Toolbar className="formulaView-toolbar">
				<ToolButton link to="/"><Icon name="close" /></ToolButton>
				{path.join(" / ")}
			</Toolbar>
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

const FormulaView = connect<StateProps, {}, OwnProps>(
	(state: AppState) => ({
		formulas: state.document.formulas,
		nodes: state.document.nodes,
	}),
)(ProtoFormulaView);


export { FormulaView };
