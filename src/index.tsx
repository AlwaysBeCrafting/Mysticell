import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import Editor from "views/Editor";

import reducer from "data";
import { loadDocument } from "data/document";



const store = createStore( reducer, composeWithDevTools() );

ReactDOM.render(
	<Provider store={ store }><Editor /></Provider>,
	document.getElementById( "root" ),
);

const exampleDoc = require<Document>( "exampleDoc.json" );
store.dispatch( loadDocument( exampleDoc ));
