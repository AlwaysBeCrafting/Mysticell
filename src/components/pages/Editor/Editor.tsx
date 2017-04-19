import * as classNames from 'classnames';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

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


const renderGraphEditor = ( props: RouteComponentProps<GraphEditorRouteParams> ) => (
	<GraphEditor className="editor-document-content" { ...props } />
);


export default ({ className, ...attrs }: Props ) => (
	<main { ...attrs } className={ classNames( 'editor', className ) }>
		<Toolbar title="Mysticell" className="editor-appbar mod-inverted" navItem={ navItem } />
		<div className="editor-document">
			<TreeView className="editor-document-nav" items={ treeItems } expandedItems={ [] } />
			<Route exact path="/formula/:id" render={ renderGraphEditor } />
		</div>
	</main>
);
