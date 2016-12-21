import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Editor from 'components/Editor';
import appReducer from 'state/reducers';

ReactDOM.render(
	<Provider store={ createStore( appReducer ) }><Editor /></Provider>,
	document.getElementById( 'root' ),
);
