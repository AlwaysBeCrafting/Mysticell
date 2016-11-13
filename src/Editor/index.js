import React from 'react';

import Fields from './Fields';
import Playmat from './Playmat';
import FormulaEditor from './FormulaEditor';

import './index.less';



export default ({ docs, docIndex, path }) => <main id="editor">
	<div id="document-area">
		<Fields fields={ docs[docIndex||0].fields } />
		{ path.length ? <FormulaEditor /> : <Playmat /> }
	</div>
</main>
