import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, RouteComponentProps} from "react-router-dom";
import {Dispatch} from "redux";

import {Tree} from "common/types";

import {MenuBar, Toolbar, TreeView} from "components/molecules";
import {FormulaView} from "components/organisms";

import {Action, AppState} from "data/AppState";
import {MenuItem} from "data/common";
import {Formula} from "data/Formula/model";

import "./EditorPage.scss";


interface StateProps {
	title: string;
	tree: Tree<Formula>;
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
	const {title, tree} = props;
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
					<TreeView className="editor-document-nav" tree={tree} expandedItems={{}} />
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
	}),
	(dispatch: Dispatch<Action>) => ({dispatch}),
)(ProtoEditor);


export {EditorPage};
