import classnames from "classnames";
import React from "react";
import {Link} from "react-router-dom";

import {Dict, isBranch} from "common/types";
import {collapse} from "common/utils";

import {TreeView} from "components/molecules";

import {Formula} from "data/Formula";
import {Nav} from "data/Nav";

import functionIcon from "./assets/icon-function.svg";
import "./NavView.scss";


interface Props {
	className?: string;
	formulas: Dict<Formula>;
	nav: Nav;
	expandedNavItems: Set<string>;
}


const getItemKey = (tree: Nav) => isBranch(tree) ? tree.value.id : tree.value;

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

	private renderItem = (tree: Nav) => (
		isBranch(tree)
			? renderDirItem(tree.value.name)
			: renderEndItem(this.props.formulas[tree.value])
	)

	private collapseNav = (props: Props): Nav => (
		collapse(props.nav, branch => branch === props.nav ||
		(isBranch(branch) && props.expandedNavItems.has(branch.value.id)))
	)
}


const renderDirItem = (name: string) => (
	<div className="navView-item">
		<span className="navView-item-icon icon">arrow_drop_down</span>
		<span className="navView-item-title">{name}</span>
	</div>
);

const renderEndItem = (formula: Formula) => (
	<div className="navView-item">
		<img className="navView-item-icon icon" src={functionIcon} />
		<Link className="navView-item-title" to={`/formula/${formula.id}`}>{formula.name}</Link>
	</div>
);


export {NavView};
