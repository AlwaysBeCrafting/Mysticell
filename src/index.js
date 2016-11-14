import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Editor from './Editor';

import store from './Editor/state';



ReactDOM.render(
	<Provider store={ store }><Editor /></Provider>,
	document.getElementById( 'root' )
);


fetch( 'http://localhost:8081/documents' )
	.then( res => res.json() )
	.then( docs => {/* dispatch here */} );