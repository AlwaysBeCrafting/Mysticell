import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { Editor } from 'components/pages';

import reducer from 'data';
import { AppState } from 'data';
import { loadDocument } from 'data/Document/actions';

import 'common/styles/fonts.scss';
import 'common/styles/normalize.scss';


const store = createStore<AppState>( reducer, devToolsEnhancer() );

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
