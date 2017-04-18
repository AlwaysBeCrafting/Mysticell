import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Editor } from 'components/pages';

import 'common/styles/fonts.scss';
import 'common/styles/normalize.scss';


const rootElem = document.querySelector( '.root' );


const renderRoot = () => {
	const editor = <Editor path={ [] }/>;
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
