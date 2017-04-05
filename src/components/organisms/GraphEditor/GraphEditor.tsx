import * as React from 'react';

import { FAB } from 'components/atoms';
import { Toolbar } from 'components/molecules';

import './GraphEditor.less';


interface Props {}


export default ( props: Props ) => (
	<div className="graphEditor" { ...props }>
		<Toolbar title="Editor" />
		<FAB icon="add" onClick={ () => {} } />
	</div>
);
