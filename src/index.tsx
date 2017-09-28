import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createEpicMiddleware} from "redux-observable";

import {EditorPage} from "components/pages";

import {AppState, appStateEpic, reducer} from "data/AppState";
import {loadDocument} from "data/Document";

import exampleDoc from "common/assets/exampleDoc.json";
import "common/styles/normalize.scss";


const epicMiddleware = createEpicMiddleware(appStateEpic);
const enhancers = composeWithDevTools(applyMiddleware(epicMiddleware));

const store = createStore<AppState>(
	reducer,
	enhancers,
);

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
	module.hot.accept("data/AppState", () => store.replaceReducer(reducer));
}
