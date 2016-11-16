import React from 'react';
import { connect } from 'react-redux';

import Fields from './Fields';
import Playmat from './Playmat';
import FormulaEditor from './FormulaEditor';

import './index.less';



const Editor = ({ path }) => <main id="editor">
	<div id="document-area">
		<Fields />
		{ path.length ? <FormulaEditor /> : <Playmat /> }
	</div>
</main>;

export default connect(
	({ path }) => ({ path }),
)( Editor );
