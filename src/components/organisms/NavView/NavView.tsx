import classnames from "classnames";
import React from "react";
import {Link} from "react-router-dom";

import {Dict, isBranch} from "common/types";
import {collapse} from "common/utils";

import {TreeView} from "components/molecules";

import {Formula} from "data/Formula";
import {Nav} from "data/Nav";

import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";
import "./NavView.scss";


interface Props {
	className?: string;
	formulas: Dict<Formula>;
	nav: Nav;
	expandedNavItems: Set<string>;
	selectedNavItem: string;
}


const getItemKey = (tree: Nav) => tree.value;

class NavView extends React.PureComponent<Props> {
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
			? renderDirItem(tree.value)
			: renderEndItem(
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
}

const renderDirItem = (name: string) => (
	<div className="navView-item">
		<span className="navView-item-icon icon">arrow_drop_down</span>
		<span className="navView-item-title">{name}</span>
	</div>
);

const renderEndItem = (formula: Formula, path: string[], isSelected: boolean) => (
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
);


export {NavView};
