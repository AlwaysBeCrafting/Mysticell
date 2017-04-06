import * as React from 'react';

import { Toolbar } from 'components/molecules';
import { GraphEditor, SheetEditor } from 'components/organisms';

import './Editor.scss';


interface Props {
	path: string[];
}


export default ( props: Props ) => (
	<main className="editor">
		<Toolbar title="Mysticell" className="editor-appbar mod-inverted" />
		<div className="editor-document">
			{ props.path.length ? <GraphEditor /> : <SheetEditor /> }
		</div>
	</main>
);
