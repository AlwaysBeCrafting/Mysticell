import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { IdMap } from 'common/types';
import { generate } from 'common/util';

import { MenuBar, Toolbar, TreeView } from 'components/molecules';
import { FormulaEditor, FormulaEditorRouteParams } from 'components/organisms';

import { Action, AppState } from 'data';
import { MenuItem } from 'data/common';
import { Formula } from 'data/Formula/model';
import { TreeItem } from 'data/Tree/model';

import './Editor.scss';


interface StateProps {
	title: string;
	tree: MenuItem[];
}

interface DispatchProps {
	dispatch: Dispatch<Action>;
}

interface PublicProps {}

type Props = StateProps & DispatchProps & PublicProps;


const navItem: MenuItem = {
	id: generate( 'MENU' ),
	title: 'menu',
};


const treeItemToMenuItem = ( formulas: IdMap<Formula> ) => ( item: TreeItem ): MenuItem => {
	const graph = formulas[item.id];
	return {
		title: ( graph && graph.name ) || item.id,
		id: item.id,
		childItems: item.children.map( treeItemToMenuItem( formulas )),
	};
};


const renderGraphEditor = ( routeProps: RouteComponentProps<FormulaEditorRouteParams> ) => (
	<FormulaEditor className="editor-document-content" { ...routeProps } />
);


const demoMenuItems: MenuItem[] = [
	{ id: 'MENU-file', title: 'File', childItems: [] },
	{ id: 'MENU-edit', title: 'Edit', childItems: [] },
	{ id: 'MENU-view', title: 'View', childItems: [] },
];


const toolbarItems: MenuItem[] = [
	{
		title: 'Menu',
		id: 'app-menu',
		render: ( item: MenuItem ) => <MenuBar items={ demoMenuItems } key={ item.id } />,
	},
];


const Editor = ( props: Props ) => {
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
					<TreeView className="editor-document-nav" items={ tree } expandedItems={ [] } />
					<Route exact path="/formula/:id" render={ renderGraphEditor } />
				</div>
			</main>
		</Router>
	);
};


export default connect<StateProps, DispatchProps, PublicProps>(
	({ document }: AppState ) => ({
		title: document.title,
		tree: document.tree.map( treeItemToMenuItem( document.formulas )),
	}),
	( dispatch: Dispatch<Action> ) => ({ dispatch }),
)( Editor );
