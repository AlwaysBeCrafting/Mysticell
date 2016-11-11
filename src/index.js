import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';

fetch( 'http://localhost:8081/documents' )
	.then( res => res.json() )
	.then( docs => ReactDOM.render(
		<Editor docs={docs} />,
		document.getElementById( 'root' )
	));