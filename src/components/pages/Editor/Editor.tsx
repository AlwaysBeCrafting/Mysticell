import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'data/common';
import { generateBadId } from 'common/util';

import { Toolbar, TreeView } from 'components/molecules';
import { GraphEditor, SheetEditor } from 'components/organisms';

import './Editor.scss';


interface Props extends React.HTMLAttributes<HTMLElement> { // cannot find name HTMLMainElement :<
	path: string[];
}


const navItem: MenuItem = {
	id: generateBadId(),
	title: 'menu',
};


const treeItems = [
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
	{ id: generateBadId(), title: 'item' },
];


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
