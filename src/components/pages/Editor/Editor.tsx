import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

import { generate } from 'common/util';

import { AppState } from 'data';
import { MenuItem } from 'data/common';

import { Toolbar, TreeView } from 'components/molecules';
import { GraphEditor, GraphEditorRouteParams } from 'components/organisms';

import './Editor.scss';


interface PublicProps extends React.HTMLAttributes<HTMLElement> {} // cannot find name HTMLMainElement :<

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & PublicProps;


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


export default connect<StateProps, DispatchProps, PublicProps>(
	({ document }: AppState ) => ({ nodes: document.nodes }),
)( Editor );
