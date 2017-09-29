import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, RouteComponentProps} from "react-router-dom";
import {Dispatch} from "redux";

import {Dict} from "common/types";

import {MenuBar, Toolbar} from "components/molecules";
import {FormulaView, NavView, SheetWrapper} from "components/organisms";

import {Action, AppState} from "data/AppState";
import { Cell } from "data/Cell";
import {MenuItem} from "data/common";
import {Formula} from "data/Formula";
import {Nav, pathToFormula} from "data/Nav";
import {Sheet} from "data/Sheet";

import "./EditorPage.scss";


interface StateProps {
	title: string;
	nav: Nav;
	formulas: Dict<Formula>;
	sheets: Dict<Sheet>;
	cells: Dict<Cell>;
	expandedNavItems: Set<string>;
}

interface DispatchProps {
	dispatch: Dispatch<Action>;
}

type Props = StateProps & DispatchProps;

const navItem: MenuItem = {
	id: "MENU-nav",
	title: "Nav",
};

const demoMenuItems: MenuItem[] = [
	{id: "MENU-file", title: "File", childItems: []},
	{id: "MENU-edit", title: "Edit", childItems: []},
	{id: "MENU-view", title: "View", childItems: []},
];

const toolbarItems: MenuItem[] = [
	{
		title: "Menu",
		id: "app-menu",
		render: (item: MenuItem) => <MenuBar items={demoMenuItems} key={item.id} />,
	},
];

class ProtoEditor extends React.PureComponent<Props> {
	public render() {
		const {title} = this.props;
		return (
			<Router>
				<main className="editor">
					<Toolbar
						title={title}
						className="editor-appbar mod-inverted"
						navItem={navItem}
						items={toolbarItems}
					/>
					<div className="editor-document">
						<Route exact path="/:path*" render={this.renderNavView} />
						<Route exact path="/" render={this.renderSheetView} />
						<Route exact path="/:path+" render={this.renderFormulaView} />
					</div>
				</main>
			</Router>
		);
	}

	private renderNavView = (routeProps: RouteComponentProps<{path: string}>) =>  (
		<NavView
			className="editor-document-nav"
			nav={this.props.nav}
			formulas={this.props.formulas}
			expandedNavItems={this.props.expandedNavItems}
			selectedNavItem={`root/${routeProps.match.params.path}`}
		/>
	)

	private renderFormulaView = (routeProps: RouteComponentProps<{path: string}>) => {
		const segments = routeProps.match.params.path.split("/");
		const formula = pathToFormula(this.props.formulas, this.props.nav, segments);
		return formula
			? (
				<FormulaView
					className="editor-document-content"
					formula={formula}
				/>
			)
			: (
				<div className="editor-document-error">
					No formula exists at /{routeProps.match.params.path}.
				</div>
			);
	}

	private renderSheetView = () => {
		return (
			<SheetWrapper
				className="editor-document-content"
				sheets={this.props.sheets}
				cells={this.props.cells}
			/>
		);
	}
}

const EditorPage = connect<StateProps, DispatchProps, {}>(
	(state: AppState) => ({
		title: state.document.title,
		nav: state.document.nav,
		formulas: state.document.formulas,
		sheets: state.document.sheets,
		cells: state.document.cells,
		expandedNavItems: state.uiState.expandedNavItems,
	}),
	(dispatch: Dispatch<Action>) => ({dispatch}),
)(ProtoEditor);


export {EditorPage};
