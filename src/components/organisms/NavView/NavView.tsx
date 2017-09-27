import classnames from "classnames";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Dispatch} from "redux";

import {Dict, isBranch} from "common/types";
import {collapse} from "common/utils";

import {TreeView} from "components/molecules";

import {Action} from "data/AppState";
import {Formula} from "data/Formula";
import {Nav} from "data/Nav";
import {toggleNavItem} from "data/UiState";

import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";
import "./NavView.scss";


interface DispatchProps {
	dispatch: Dispatch<Action>;
}

interface OwnProps {
	className?: string;
	formulas: Dict<Formula>;
	nav: Nav;
	expandedNavItems: Set<string>;
	selectedNavItem: string;
}

type Props =
	& DispatchProps
	& OwnProps;


const getItemKey = (tree: Nav) => tree.value;

class ProtoNavView extends React.PureComponent<Props> {
	private collapsedNav: Nav;

	public componentWillMount() {
		this.collapsedNav = this.collapseNav(this.props);
	}

	public componentWillReceiveProps(nextProps: Props) {
		const {nav, expandedNavItems} = this.props;
		if (nav !== nextProps.nav || expandedNavItems !== nextProps.expandedNavItems) {
			this.collapsedNav = this.collapseNav(nextProps);
		}
	}

	public render() {
		const props = this.props;
		return (
			<TreeView
				className={classnames("navView", props.className)}
				tree={this.collapsedNav}
				getKey={getItemKey}
				renderItem={this.renderItem}
			/>
		);
	}

	private renderItem = (tree: Nav, path: string[]) => (
		isBranch(tree)
			? this.renderDirItem(tree.value, path)
			: this.renderEndItem(
				this.props.formulas[tree.value],
				path,
				this.props.selectedNavItem === `${path.join("/")}/${this.props.formulas[tree.value].name}`,
			)
	)

	private collapseNav = (props: Props): Nav => (
		collapse(props.nav, (branch, path) => (
			branch === props.nav ||
			props.expandedNavItems.has(`${path.join("/")}/${branch.value}`)
		))
	)

	private toggleBranchItemExpanded = (event: React.MouseEvent<HTMLDivElement>) => {
		const path = event.currentTarget.getAttribute("data-path");
		const name = event.currentTarget.getAttribute("data-name");
		this.props.dispatch(toggleNavItem(`${path}/${name}`));
	}

	private renderDirItem = (name: string, path: string[]) => (
		<div
			className="navView-item"
			data-path={path.join("/")}
			data-name={name}
			onClick={this.toggleBranchItemExpanded}
		>
			<span
				className={classnames(
					"navView-item-icon",
					"icon",
					"mod-dropdown",
					{ "is-expanded": this.props.expandedNavItems.has(`${path.join("/")}/${name}`) })}
			>
				arrow_drop_down
			</span>
			<span className="navView-item-title">{name}</span>
		</div>
	)

	private renderEndItem = (formula: Formula, path: string[], isSelected: boolean) => (
		<Link
			className={classnames(
				"navView-item",
				{ "is-selected": isSelected },
			)}
			to={`/${path.slice(1).join("/")}/${formula.name}`}
		>
			<img
				className={classnames(
					"navView-item-icon icon",
					{ "is-selected": isSelected },
				)}
				src={formula.isProperty ? propertyIcon : functionIcon}
			/>
			<div className="navView-item-title">{formula.name}</div>
		</Link>
	)
}


const NavView = connect<{}, DispatchProps, OwnProps>(
	() => ({}),
	(dispatch: Dispatch<Action>) => ({ dispatch }),
)(ProtoNavView);


export {NavView};
