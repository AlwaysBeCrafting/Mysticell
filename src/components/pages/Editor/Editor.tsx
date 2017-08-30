import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { Tree } from "common/types";
import { generate } from "common/util";

import { MenuBar, Toolbar, TreeView } from "components/molecules";
import { FormulaEditor, FormulaEditorRouteParams } from "components/organisms";

import { Action, AppState } from "data";
import { MenuItem } from "data/common";
import { Formula } from "data/Formula/model";

import "./Editor.scss";


interface StateProps {
	title: string;
	tree: Tree<Formula>;
}

interface DispatchProps {
	dispatch: Dispatch<Action>;
}

type Props = StateProps & DispatchProps;


const navItem: MenuItem = {
	id: generate("MENU"),
	title: "menu",
};


const renderGraphEditor = (routeProps: RouteComponentProps<FormulaEditorRouteParams>) => (
	<FormulaEditor className="editor-document-content" { ...routeProps } />
);


const demoMenuItems: MenuItem[] = [
	{ id: "MENU-file", title: "File", childItems: [] },
	{ id: "MENU-edit", title: "Edit", childItems: [] },
	{ id: "MENU-view", title: "View", childItems: [] },
];


const toolbarItems: MenuItem[] = [
	{
		title: "Menu",
		id: "app-menu",
		render: (item: MenuItem) => <MenuBar items={ demoMenuItems } key={ item.id } />,
	},
];


const Editor = (props: Props) => {
	const { title, tree } = props;
	return (
		<Router>
			<main className="editor">
				<Toolbar
					title={ title }
					className="editor-appbar mod-inverted"
					navItem={ navItem }
					items={ toolbarItems }
				/>
				<div className="editor-document">
					<TreeView className="editor-document-nav" tree={ tree } expandedItems={ {} } />
					<Route exact path="/formula/:id" render={ renderGraphEditor } />
				</div>
			</main>
		</Router>
	);
};


export default connect<StateProps, DispatchProps, {}>(
	({ document }: AppState) => ({
		title: document.title,
		tree: document.tree,
	}),
	(dispatch: Dispatch<Action>) => ({ dispatch }),
)(Editor);
