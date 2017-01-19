import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Editor from "components/Editor";

import { loadDocument } from "redux/actions/document";
import { reducer } from "redux/reducers";

import DocJson from "data/docJson";

//==============================================================================

const store = createStore( reducer );

ReactDOM.render(
	<Provider store={ store }><Editor /></Provider>,
	document.getElementById( "root" ),
);

const exampleDoc = require<DocJson>( "data/exampleDoc.json" );
store.dispatch( loadDocument( exampleDoc ));
