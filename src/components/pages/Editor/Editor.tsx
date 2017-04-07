import * as classNames from 'classnames';
import * as React from 'react';

import { MenuItem } from 'common/types';
import { generateBadId } from 'common/util';

import { Toolbar } from 'components/molecules';
import { GraphEditor, SheetEditor } from 'components/organisms';

import './Editor.scss';


interface Props extends React.HTMLAttributes<HTMLElement> { // cannot find name HTMLMainElement :<
	path: string[];
}


const navItem: MenuItem = {
	id: generateBadId(),
	title: 'menu',
};


export default ({ path, className, ...attrs }: Props ) => (
	<main { ...attrs } className={ classNames( 'editor', className ) }>
		<Toolbar title="Mysticell" className="editor-appbar mod-inverted" navItem={ navItem } />
		<div className="editor-document">
			{ path.length ? <GraphEditor /> : <SheetEditor /> }
		</div>
	</main>
);
