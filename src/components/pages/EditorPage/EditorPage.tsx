import React from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { Dict } from "common/types";

import { GraphView, NavView, SheetWrapper } from "components/organisms";

import { Action, AppState } from "data/AppState";
import { Nav, pathToNodePrototype } from "data/Nav";
import { isGraph, NodePrototype } from "data/NodePrototype";
import { PropertyCache } from "data/PropertyCache";
import { Sheet } from "data/Sheet";

import "./EditorPage.scss";


interface StateProps {
	title: string;
	nav: Nav;
	nodePrototypes: Dict<NodePrototype>;
	sheets: Dict<Sheet>;
	expandedNavItems: Set<string>;
	propertyCache: PropertyCache;
}
interface DispatchProps {
	dispatch: Dispatch<Action>;
}
type Props =
	& StateProps
	& DispatchProps;

class ProtoEditor extends React.PureComponent<Props> {
	public render() {
		return (
			<Router>
				<main className="editor">
					<div className="editor-document">
						<Route exact path="/:path*" render={this.renderNavView} />
						<Route exact path="/" render={this.renderSheetView} />
						<Route exact path="/:path+" render={this.renderGraphView} />
					</div>
				</main>
			</Router>
		);
	}

	private renderNavView = (routeProps: RouteComponentProps<{path: string}>) =>  (
		<NavView
			className="editor-document-nav"
			nav={this.props.nav}
			nodePrototypes={this.props.nodePrototypes}
			expandedNavItems={this.props.expandedNavItems}
			selectedNavItem={`root/${routeProps.match.params.path}`}
		/>
	)

	private renderGraphView = (routeProps: RouteComponentProps<{path: string}>) => {
		const segments = routeProps.match.params.path.split("/");
		const prototype = pathToNodePrototype(this.props.nodePrototypes, this.props.nav, segments);
		if (prototype && isGraph(prototype)) {
			return (
				<GraphView
					className="editor-document-content"
					path={segments}
					prototype={prototype}
				/>
			);
		} else {
			return (
				<div className="editor-document-error">
					No formula exists at /{routeProps.match.params.path}.
				</div>
			);
		}
	}

	private renderSheetView = () => {
		return (
			<SheetWrapper className="editor-document-content" />
		);
	}
}

const EditorPage = connect<StateProps, DispatchProps, {}>(
	(state: AppState) => ({
		title: state.document.title,
		nav: state.document.nav,
		nodePrototypes: state.document.nodePrototypes,
		sheets: state.document.sheets,
		expandedNavItems: state.uiState.expandedNavItems,
		propertyCache: state.propertyCache,
	}),
	(dispatch: Dispatch<Action>) => ({dispatch}),
)(ProtoEditor);


export { EditorPage };
