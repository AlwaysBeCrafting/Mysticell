import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Editor } from 'components/pages';

import reducer from 'data';
import { AppState } from 'data';
import { loadDocument } from 'data/Document/actions';

import 'common/styles/fonts.scss';
import 'common/styles/normalize.scss';


const store = createStore<AppState>(
	reducer,
	// tslint:disable-next-line:no-string-literal
	window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
);

store.dispatch( loadDocument( require( 'common/assets/exampleDoc.json' )));


const rootElem = document.querySelector( '.root' );

const renderRoot = () => {
	const editor = <Provider store={ store }><Editor /></Provider>;
	ReactDOM.render(
		( process.env.NODE_ENV === 'development' )
			? <AppContainer>{ editor }</AppContainer>
			: editor,
		rootElem,
	);
};

renderRoot();

if (( process.env.NODE_ENV === 'development' ) && module.hot ) {
	module.hot.accept( 'components/pages', renderRoot );
}
