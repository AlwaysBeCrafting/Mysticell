import * as React from 'react';
import { connect } from 'react-redux';

import Fields from './Fields';
import FormulaEditor from './FormulaEditor';
import Playmat from './Playmat';

import './index.less';

export interface EditorProps {
	path: string[];
}

const Editor = (props: EditorProps) => <main id="editor">
	<div id="document-area">
		<Fields items = { [] } />
		{ props.path.length ? <FormulaEditor /> : <Playmat /> }
	</div>
</main>;

export default connect(
	({ path }) => ({ path }),
)( Editor );
