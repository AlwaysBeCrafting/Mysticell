import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from 'components/pages';

import 'common/styles/fonts.scss';
import 'common/styles/normalize.scss';


ReactDOM.render(
	<Editor path={ [] }/>,
	document.querySelector( '.root' ),
);


