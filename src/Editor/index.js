import React from 'react';

import Fields from './Fields';
import Playmat from './Playmat';
import FormulaEditor from './FormulaEditor';

import './index.less';



export default ({ doc, path }) => <main id="editor">
	<div id="document-area">
		<Fields fields={ doc.fields } />
		{ path.length ? <FormulaEditor doc={ doc }/> : <Playmat doc={ doc } /> }
	</div>
</main>
