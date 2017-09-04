import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, RouteComponentProps} from "react-router-dom";
import {Dispatch} from "redux";

import {Dict, Tree} from "common/types";

import {MenuBar, Toolbar, TreeView} from "components/molecules";
import {FormulaView} from "components/organisms";

import {Action, AppState} from "data/AppState";
import {MenuItem} from "data/common";
import {Formula} from "data/Formula";
import {SidebarNode} from "data/SidebarNode";

import "./EditorPage.scss";


interface StateProps {
	title: string;
	tree: Tree<SidebarNode>;
	formulas: Dict<Formula>;
}

interface DispatchProps {
	dispatch: Dispatch<Action>;
}

type Props = StateProps & DispatchProps;

const navItem: MenuItem = {
	id: "MENU-nav",
	title: "Nav",
};

const renderFormula = (routeProps: RouteComponentProps<{id: string}>) => (
	<FormulaView className="editor-document-content" id={routeProps.match.params.id}/>
);

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

const ProtoEditor = (props: Props) => {
	const {title, tree, formulas} = props;
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
					<TreeView
						className="editor-document-nav"
						tree={tree}
						getKey={item => (item.type === "dir" ? item.name : item.id)}
						getName={item => (item.type === "dir" ? item.name : formulas[item.id].name)}
					/>
					<Route exact path="/formula/:id" render={renderFormula} />
				</div>
			</main>
		</Router>
	);
};

const EditorPage = connect<StateProps, DispatchProps, {}>(
	({document}: AppState) => ({
		title: document.title,
		tree: document.tree,
		formulas: document.formulas,
	}),
	(dispatch: Dispatch<Action>) => ({dispatch}),
)(ProtoEditor);


export {EditorPage};
