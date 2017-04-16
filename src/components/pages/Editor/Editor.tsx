import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'data/common';
import { generate } from 'common/util';

import { Toolbar, TreeView } from 'components/molecules';
import { GraphEditor, SheetEditor } from 'components/organisms';

import './Editor.scss';


interface Props extends React.HTMLAttributes<HTMLElement> { // cannot find name HTMLMainElement :<
	path: string[];
}


const navItem: MenuItem = {
	id: generate( 'MENU' ),
	title: 'menu',
};


const treeItems = Array( 12 ).map( () => ({ id: generate( 'FIELD' ) , title: 'item' }));


export default ({ path, className, ...attrs }: Props ) => {
	const ContentEditor = path.length ? GraphEditor : SheetEditor;

	return (
		<main { ...attrs } className={ classNames( 'editor', className ) }>
			<Toolbar title="Mysticell" className="editor-appbar mod-inverted" navItem={ navItem } />
			<div className="editor-document">
				<TreeView className="editor-document-nav" items={ treeItems } expandedItems={ [] } />
				{ <ContentEditor className="editor-document-content" /> }
			</div>
		</main>
	);
};
