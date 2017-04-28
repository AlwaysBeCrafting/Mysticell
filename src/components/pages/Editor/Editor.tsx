import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { generate } from 'common/util';

import { MenuBar } from 'components/molecules';
import { Toolbar, TreeView } from 'components/molecules';
import { GraphEditor, GraphEditorRouteParams } from 'components/organisms';

import { Action, AppState } from 'data';
import { MenuItem } from 'data/common';
import { Graph } from 'data/Graph/model';
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


const treeItemToMenuItem = ( graphs: Map<string, Graph> ) => ( item: TreeItem ): MenuItem => {
	const graph = graphs.get( item.id );
	return {
		title: ( graph && graph.name ) || item.id,
		id: item.id,
		childItems: item.children.map( treeItemToMenuItem( graphs )),
	};
};


const renderGraphEditor = ( routeProps: RouteComponentProps<GraphEditorRouteParams> ) => (
	<GraphEditor className="editor-document-content" { ...routeProps } />
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
		tree: document.tree.map( treeItemToMenuItem( document.graphs )),
	}),
	( dispatch: Dispatch<Action> ) => ({ dispatch }),
)( Editor );
