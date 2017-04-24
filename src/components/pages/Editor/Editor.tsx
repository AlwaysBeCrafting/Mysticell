import classNames from 'classnames';
import React from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

import { generate } from 'common/util';

import { MenuItem } from 'data/common';

import { Toolbar, TreeView } from 'components/molecules';
import { GraphEditor, GraphEditorRouteParams } from 'components/organisms';

import './Editor.scss';


interface Props extends React.HTMLAttributes<HTMLElement> {} // cannot find name HTMLMainElement :<


const navItem: MenuItem = {
	id: generate( 'MENU' ),
	title: 'menu',
};


const treeItems = Array( 12 ).fill( 0 ).map( () => ({ id: generate( 'FIELD' ) , title: 'item' }));


const renderGraphEditor = ( routeProps: RouteComponentProps<GraphEditorRouteParams> ) => (
	<GraphEditor className="editor-document-content" { ...routeProps } />
);


const renderDocument = () => (
	<div className="editor-document">
		<TreeView className="editor-document-nav" items={ treeItems } expandedItems={ [] } />
		<Route exact path="/formula/:id" render={ renderGraphEditor } />
	</div>
);


const Editor = ({ className }: Props ) => (
	<Router>
		<main className={ classNames( 'editor', className ) }>
			<Toolbar title="Mysticell" className="editor-appbar mod-inverted" navItem={ navItem } />
			{ renderDocument() }
		</main>
	</Router>
);

export default Editor;
