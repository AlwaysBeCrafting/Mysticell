import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";

import {EditorPage} from "components/pages";

import {loadDocument} from "data/Document";

import {configureStore} from "store";

import exampleDoc from "common/assets/exampleDoc.json";
import "common/styles/normalize.scss";


const store = configureStore();
store.dispatch(loadDocument(exampleDoc));

const rootElem = document.querySelector(".root");

const renderRoot = () => {
	const editor = <Provider store={store}><EditorPage /></Provider>;
	ReactDOM.render(
		(process.env.NODE_ENV === "development")
			? <AppContainer>{editor}</AppContainer>
			: editor,
		rootElem,
	);
};

renderRoot();

if ((process.env.NODE_ENV === "development") && module.hot) {
	module.hot.accept("components/pages", renderRoot);
}
