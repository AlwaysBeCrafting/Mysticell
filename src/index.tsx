import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Editor from './components/Editor';

import store from './state';

ReactDOM.render(
	<Provider store={ store }><Editor /></Provider>,
	document.getElementById( 'root' ),
);
